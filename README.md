![PyPI - Version](https://img.shields.io/pypi/v/trulens_eval?label=trulens_eval&link=https%3A%2F%2Fpypi.org%2Fproject%2Ftrulens-eval%2F)
![Azure DevOps builds (job)](https://img.shields.io/azure-devops/build/truera/5a27f3d2-132d-40fc-9b0c-81abd1182f41/9)
![GitHub](https://img.shields.io/github/license/truera/trulens)
![PyPI - Downloads](https://img.shields.io/pypi/dm/trulens_eval)
[![Slack](https://img.shields.io/badge/slack-join-green?logo=slack)](https://communityinviter.com/apps/aiqualityforum/josh)
[![Docs](https://img.shields.io/badge/docs-trulens.org-blue)](https://www.trulens.org/trulens_eval/getting_started/)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/truera/trulens/blob/releases/rc-trulens-eval-0.17.0/trulens_eval/examples/quickstart/colab/langchain_quickstart_colab.ipynb)

# 🦑 Welcome to TruLens!

![TruLens](https://www.trulens.org/assets/images/Neural_Network_Explainability.png)

TruLens provides a set of tools for developing and monitoring neural nets,
including large language models. This includes both tools for evaluation of LLMs
and LLM-based applications with _TruLens-Eval_ and deep learning explainability
with _TruLens-Explain_. _TruLens-Eval_ and _TruLens-Explain_ are housed in
separate packages and can be used independently.


## About

**Don't just vibe-check your LLM app!** Systematically evaluate and track your
LLM experiments with TruLens. As you develop your app including prompts, models,
retrievers, knowledge sources and more, *TruLens* is the tool you need to
understand its performance.

Fine-grained, stack-agnostic instrumentation and comprehensive evaluations help
you to identify failure modes & systematically iterate to improve your
application.

Read more about the core concepts behind TruLens including [Feedback Functions](https://www.trulens.org/trulens_eval/getting_started/core_concepts/feedback_functions/),
[The RAG Triad](https://www.trulens.org/trulens_eval/getting_started/core_concepts/rag_triad/),
and [Honest, Harmless and Helpful Evals](https://www.trulens.org/trulens_eval/getting_started/core_concepts/honest_harmless_helpful_evals/).

## TruLens in the Development Workflow

Build your first prototype then connect instrumentation and logging with
TruLens. Decide what feedbacks you need, and specify them with TruLens to run
alongside your app. Then iterate and compare versions of your app in an
easy-to-use user interface 👇

![Architecture
Diagram](https://www.trulens.org/assets/images/TruLens_Architecture.png)

## Installation and Setup

Install the trulens-eval pip package from PyPI.

```bash
    pip install trulens
```

## Quick Usage

Walk through how to instrument and evaluate a RAG built from scratch with
TruLens.

[![Open In
Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/truera/trulens/blob/main/trulens_eval/examples/quickstart/quickstart.ipynb)

### 💡 Contributing & Community

Interested in contributing? See our [contributing
guide](https://www.trulens.org/trulens_eval/contributing/) for more details.

The best way to support TruLens is to give us a ⭐ on
[GitHub](https://www.github.com/truera/trulens) and join our [slack
community](https://communityinviter.com/apps/aiqualityforum/josh)!
