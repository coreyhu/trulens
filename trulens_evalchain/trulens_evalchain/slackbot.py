from multiprocessing.pool import ThreadPool
import os
from pprint import PrettyPrinter
from typing import Dict, Set, Tuple

from langchain.callbacks import get_openai_callback
import numpy as np

from trulens_evalchain import tru
from trulens_evalchain import tru_feedback
from trulens_evalchain.tru import thread_pool
from trulens_evalchain.tru_chain import TruChain
from trulens_evalchain.tru_db import LocalSQLite
from trulens_evalchain.tru_db import LocalTinyDB
from trulens_evalchain.tru_db import Record
from trulens_evalchain.tru_db import TruDB
from trulens_evalchain.tru_feedback import Feedback

os.environ['PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION'] = 'python'

import logging

from langchain.chains import ConversationalRetrievalChain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.memory import ConversationSummaryBufferMemory
from langchain.vectorstores import Pinecone
import pinecone
from slack_bolt import App
from slack_sdk import WebClient

from trulens_evalchain.keys import PINECONE_API_KEY
from trulens_evalchain.keys import PINECONE_ENV
from trulens_evalchain.keys import SLACK_SIGNING_SECRET
from trulens_evalchain.keys import SLACK_TOKEN

pp = PrettyPrinter()

PORT = 3000
verb = True

# create a conversational chain with relevant models and vector store

# Pinecone configuration.
pinecone.init(
    api_key=PINECONE_API_KEY,  # find at app.pinecone.io
    environment=PINECONE_ENV  # next to api key in console
)

# Cache of conversations. Keys are SlackAPI conversation ids (channel ids or
# otherwise) and values are TruChain to handle that conversation.
convos: Dict[str, TruChain] = dict()

# Keep track of timestamps of messages already handled. Sometimes the same
# message gets received more than once if there is a network hickup.
handled_ts: Set[Tuple[str, str]] = set()

# DB to save models and records.
db = LocalSQLite()

ident = lambda h: h

chain_ids = {0: "0/default", 1: "1/lang_prompt", 2: "2/relevance_prompt"}


def get_or_make_chain(cid: str, selector: int = 0) -> TruChain:
    """
    Create a new chain for the given conversation id `cid` or return an existing
    one. Return the new or existing chain.
    """

    # NOTE(piotrm): Unsure about the thread safety of the various components so
    # making new ones for each conversation.

    if cid in convos:
        return convos[cid]

    if selector not in chain_ids:
        selector = 0

    chain_id = chain_ids[selector]

    pp.pprint(f"Starting a new conversation with {chain_id}.")

    # Embedding needed for Pinecone vector db.
    embedding = OpenAIEmbeddings(model='text-embedding-ada-002')  # 1536 dims
    docsearch = Pinecone.from_existing_index(
        index_name="llmdemo", embedding=embedding
    )
    retriever = docsearch.as_retriever()

    # LLM for completing prompts, and other tasks.
    llm = OpenAI(temperature=0, max_tokens=128)

    # Conversation memory.
    memory = ConversationSummaryBufferMemory(
        max_token_limit=650,
        llm=llm,
        memory_key="chat_history",
        output_key='answer'
    )

    # Conversational chain puts it all together.
    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        verbose=verb,
        return_source_documents=True,
        memory=memory,
        get_chat_history=ident,
        max_tokens_limit=4096
    )

    # Need to copy these otherwise various chains will feature templates that
    # point to the same objects.
    chain.combine_docs_chain.llm_chain.prompt = \
        chain.combine_docs_chain.llm_chain.prompt.copy()
    chain.combine_docs_chain.document_prompt = \
        chain.combine_docs_chain.document_prompt.copy()

    if "lang" in chain_id:
        # Language mismatch fix:
        chain.combine_docs_chain.llm_chain.prompt.template = \
            "Use the following pieces of context to answer the question at the end " \
            "in the same language as the question. If you don't know the answer, " \
            "just say that you don't know, don't try to make up an answer.\n" \
            "\n" \
            "{context}\n" \
            "\n" \
            "Question: {question}\n" \
            "Helpful Answer: "

    elif "relevance" in chain_id:
        # Contexts fix

        # whitespace important in "Contexts! "
        chain.combine_docs_chain.llm_chain.prompt.template = \
            "Use only the relevant contexts to answer the question at the end " \
            ". Some pieces of context may not be relevant. If you don't know the answer, " \
            "just say that you don't know, don't try to make up an answer.\n" \
            "\n" \
            "Contexts: \n" \
            "{context}\n" \
            "\n" \
            "Question: {question}\n" \
            "Helpful Answer: "

        # "\t" important here:
    chain.combine_docs_chain.document_prompt.template = "\tContext: {page_content}"

    # Trulens instrumentation.
    tc = TruChain(chain=chain, chain_id=chain_id)

    convos[cid] = tc

    return tc


# Construct feedback functions.

hugs = tru_feedback.Huggingface()
openai = tru_feedback.OpenAI()

# Language match between question/answer.
f_lang_match = Feedback(hugs.language_match).on(
    text1="prompt", text2="response"
)

# Question/answer relevance between overall question and answer.
f_qa_relevance = Feedback(openai.relevance).on(
    prompt="input", response="output"
)

# Question/statement relevance between question and each context chunk.
f_qs_relevance = Feedback(openai.qs_relevance).on(
    question="input",
    statement=Record.chain.combine_docs_chain._call.args.inputs.input_documents
).on_multiple(
    multiarg="statement", each_query=Record.page_content, agg=np.min
)


def get_answer(chain: TruChain, question: str) -> Tuple[str, str]:
    """
    Use the given `chain` to respond to `question`. Return the answer text and
    sources elaboration text.
    """

    with get_openai_callback() as cb:
        outs, record = chain(dict(question=question))
        total_tokens = cb.total_tokens
        total_cost = cb.total_cost

    result = outs['answer']

    def log_and_feedback():
        # Log the interaction.
        record_id = tru.add_data(
            chain_id=chain.chain_id,
            prompt=question,
            response=result,
            record=record,
            tags='dev',
            total_tokens=total_tokens,
            total_cost=total_cost
        )

        # Run feedback function and get value
        feedbacks = tru.run_feedback_functions(
            chain=chain,
            record=record,
            feedback_functions=[f_lang_match, f_qa_relevance, f_qs_relevance]
        )

        # Add value to database
        tru.add_feedback(record_id, feedbacks)

    thread_pool.apply_async(log_and_feedback)

    sources = outs['source_documents']

    result_sources = "Sources:\n"

    temp = set()

    for doc in sources:
        src = doc.metadata['source']
        if src not in temp:
            result_sources += " - " + doc.metadata['source']
            if 'page' in doc.metadata:
                result_sources += f" (page {int(doc.metadata['page'])})\n"
            else:
                result_sources += "\n"

            temp.add(src)

    return result, result_sources


def answer_message(client, body: dict, logger):
    """
    SlackAPI handler of message received.
    """

    pp.pprint(body)

    ts = body['event']['ts']
    user = body['event']['user']

    if (ts, user) in handled_ts:
        print(f"WARNING: I already handled message with ts={ts}, user={user} .")
        return
    else:
        handled_ts.add((ts, user))

    message = body['event']['text']
    channel = body['event']['channel']

    if "thread_ts" in body['event']:
        client.chat_postMessage(
            channel=channel, thread_ts=ts, text=f"Looking..."
        )

        convo_id = body['event']['thread_ts']

        chain = get_or_make_chain(convo_id)

    else:
        convo_id = ts

        if len(message) >= 2 and message[0] == "s" and message[1] in [
                "0", "1", "2", "3", "4", "5"
        ]:
            selector = int(message[1])
            chain = get_or_make_chain(convo_id, selector=selector)

            client.chat_postMessage(
                channel=channel,
                thread_ts=ts,
                text=f"I will use chain {chain.chain_id} for this conversation."
            )

            if len(message) == 2:
                return
            else:
                message = message[2:]

        else:
            chain = get_or_make_chain(convo_id)

            client.chat_postMessage(
                channel=channel,
                thread_ts=ts,
                text=f"Hi. Let me check that for you..."
            )

    res, res_sources = get_answer(chain, message)

    client.chat_postMessage(
        channel=channel,
        thread_ts=ts,
        text=str(res) + "\n" + str(res_sources),
        blocks=[
            dict(type="section", text=dict(type='mrkdwn', text=str(res))),
            dict(
                type="context",
                elements=[dict(type='mrkdwn', text=str(res_sources))]
            )
        ]
    )

    pp.pprint(res)
    pp.pprint(res_sources)

    logger.info(body)


# WebClient instantiates a client that can call API methods When using Bolt, you
# can use either `app.client` or the `client` passed to listeners.
client = WebClient(token=SLACK_TOKEN)
logger = logging.getLogger(__name__)

# Initializes your app with your bot token and signing secret
app = App(
    token=SLACK_TOKEN,
    signing_secret=SLACK_SIGNING_SECRET,
)


@app.event("app_home_opened")
def update_home_tab(client, event, logger):
    try:
        # views.publish is the method that your app uses to push a view to the Home tab
        client.views_publish(
            # the user that opened your app's app home
            user_id=event["user"],
            # the view object that appears in the app home
            view={
                "type":
                    "home",
                "callback_id":
                    "home_view",

                # body of the view
                "blocks":
                    [
                        {
                            "type": "section",
                            "text":
                                {
                                    "type":
                                        "mrkdwn",
                                    "text":
                                        "*I'm here to answer questions and test feedback functions.* :tada: Note that all of my conversations and thinking are recorded."
                                }
                        }
                    ]
            }
        )

    except Exception as e:
        logger.error(f"Error publishing home tab: {e}")


@app.event("message")
def handle_message_events(body, logger):
    """
    Handle direct messages to the bot.
    """

    answer_message(client, body, logger)


@app.event("app_mention")
def handle_app_mention_events(body, logger):
    """
    Handle messages that mention the bot.
    """

    answer_message(client, body, logger)


def start_bot():
    app.start(port=int(PORT))


# Start your app
if __name__ == "__main__":
    start_bot()
