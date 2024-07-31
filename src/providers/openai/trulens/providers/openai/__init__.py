"""
!!! note "Additional Dependency Required"

    To use this module, you must have the `trulens-providers-openai` package installed.

    ```bash
    pip install trulens-providers-openai
    ```
"""

from trulens.providers.openai.provider import AzureOpenAI
from trulens.providers.openai.provider import OpenAI

__all__ = ["OpenAI", "AzureOpenAI"]
