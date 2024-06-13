from concurrent.futures import wait
from typing import List

from trulens_eval.feedback import Feedback
from trulens_eval.utils.containers import first
from trulens_eval.utils.containers import second
from trulens_eval.utils.threading import ThreadPoolExecutor
from trulens_eval.utils.serial import model_dump

from trulens_eval.utils.imports import OptionalImports
from trulens_eval.utils.imports import REQUIREMENT_LLAMA

with OptionalImports(messages=REQUIREMENT_LLAMA):
    import llama_index
    from llama_index.core.query_engine.retriever_query_engine import \
        RetrieverQueryEngine
    from llama_index.core.indices.vector_store.base import VectorStoreIndex
    from llama_index.indices.query.schema import QueryBundle
    from llama_index.schema import NodeWithScore

class WithFeedbackFilterNodes(RetrieverQueryEngine):
    feedback: Feedback
    threshold: float

    def __init__(self, query_engine: RetrieverQueryEngine, feedback: Feedback, threshold: float, *args, **kwargs):
        """
        A BaseQueryEngine that filters documents using a minimum threshold
        on a feedback function before returning them.

        Args:
            feedback (Feedback): use this feedback function to score each document.
            threshold (float): and keep documents only if their feedback value is at least this threshold.
        
        !!! example "Using TruLens guardrail context filters with Llama-Index"
            ```python
            from trulens_eval.guardrails.llama import WithFeedbackFilterNodes

            # note: feedback function used for guardrail must only return a score, not also reasons
            f_context_relevance_score = (
                Feedback(provider.context_relevance)
                .on_input()
                .on(context)
                .aggregate(np.mean)
            )

            filtered_query_engine = WithFeedbackFilterNodes(query_engine, feedback=f_context_relevance_score, threshold=0.5)

            tru_recorder = TruLlama(filtered_query_engine,
                app_id='LlamaIndex_App1_Filtered',
                feedbacks=[f_answer_relevance, f_context_relevance, f_groundedness])

            with tru_recorder as recording:
                llm_response = filtered_query_engine.query("What did the author do growing up?")
            ```
        """
        self.query_engine = query_engine
        self.feedback = feedback
        self.threshold = threshold

    def query(self, query: QueryBundle, **kwargs) -> List[NodeWithScore]:
        """
        An extended query method that will:

        1. Query the engine with the given query bundle (like before).
        2. Evaluate nodes with a specified feedback function.
        3. Filter out nodes that do not meet the minimum threshold.
        4. Synthesize with only the filtered nodes.

        Parameters:
            query: QueryBundle - the query bundle to search for relevant nodes.

            **kwargs: additional keyword arguments.

        Returns:
            List[NodeWithScore]: a list of filtered, relevant nodes.
        """
        # Get relevant docs using super class:
        nodes = self.query_engine.retrieve(query_bundle=query)
        ex = ThreadPoolExecutor(max_workers=max(1, len(nodes)))

        # Evaluate the filter on each, in parallel.
        futures = list(
            (
                node,
                ex.submit(
                    (
                        lambda node: self.feedback(
                            query, node.node.get_text()
                        )
                    ),
                    node=node
                )
            ) for node in nodes
        )

        wait([future for (_, future) in futures])

        results = list((node, future.result()) for (node, future) in futures)
        for node, result in results:
            if not isinstance(result, float):
                raise ValueError("Guardrails can only be used with feedback functions that return a float.")
        filtered = map(first, filter(lambda x: second(x) > self.threshold, results))

        filtered_nodes = list(filtered)
        return self.query_engine.synthesize(query_bundle=query, nodes=filtered_nodes, **kwargs)
