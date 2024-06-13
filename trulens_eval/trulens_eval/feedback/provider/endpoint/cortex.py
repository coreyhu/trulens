import inspect
import logging
import pprint
from typing import Any, Callable, ClassVar, Optional

import pydantic

from trulens_eval.feedback.provider.endpoint.base import Endpoint
from trulens_eval.feedback.provider.endpoint.base import EndpointCallback
from trulens_eval.utils.imports import OptionalImports
from trulens_eval.utils.imports import REQUIREMENT_CORTEX

logger = logging.getLogger(__name__)

pp = pprint.PrettyPrinter()

with OptionalImports(messages=REQUIREMENT_CORTEX):
    from snowflake.snowpark import Session

class CortexCallback(EndpointCallback):
    model_config: ClassVar[dict] = dict(arbitrary_types_allowed=True)

    def handle_classification(self, response: pydantic.BaseModel) -> None:
        super().handle_classification(response)

    def handle_generation(self, response: pydantic.BaseModel) -> None:
        """Get the usage information from Cortex LLM function response's usage field."""

        response = response.model_dump()

        usage = response['usage']
            
        # Incremente number of requests.
        super().handle_generation(response)

        # Assume a response that had usage field was successful. Note at the time of writing 06/12/2024, the usage
        # information from Cortex LLM functions is only available when called via snow SQL. It's not fully supported in 
        # Python API such as `from snowflake.cortex import Summarize, Complete, ExtractAnswer, Sentiment, Translate` not yet.
        
        self.cost.n_successful_requests += 1

        for cost_field, cortex_field in [
            ("n_tokens", "total_tokens"),
            ("n_prompt_tokens", "prompt_tokens"),
            ("n_completion_tokens", "completion_tokens"),
        ]:
            setattr(self.cost, cost_field, usage.get(cortex_field, 0))



class CortexEndpoint(Endpoint):
    """Snowflake Cortex endpoint."""


    def __init__(self, *args, **kwargs):
        if hasattr(self, "name"):
            # singleton already made
            if len(kwargs) > 0:
                logger.warning(
                    "Ignoring additional kwargs for singleton endpoint %s: %s",
                    self.name, pp.pformat(kwargs)
                )
                self.warning()
            return

        kwargs['name'] = "cortex"
        kwargs['callback_class'] = CortexCallback
        

        super().__init__(*args, **kwargs)
        from snowflake import snowpark
        # TODO: figure out if there are other methods or class we want to instrument with _instrument_module_members / _instrument_module
        self._instrument_module_members(snowpark, "Session.sql")


    def __new__(cls, *args, **kwargs):     
        return super(Endpoint, cls).__new__(cls, name="cortex")

    def handle_wrapped_call(
        self, func: Callable, bindings: inspect.BoundArguments, response: Any,
        callback: Optional[EndpointCallback]
    ) -> None:

        counted_something = False

        
        if hasattr(response, 'usage'):
            counted_something = True

            self.global_callback.handle_generation(response=response)

            if callback is not None:
                callback.handle_generation(response=response)

        if not counted_something:
            logger.warning(
                "Unrecognized Cortex response format. It did not have usage information:\n%s",
                pp.pformat(response)
            )
