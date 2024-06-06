/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Specifies additional details on how this span relates to its parent span.
 *
 * Note that this enumeration is experimental and likely to change. See
 * https://github.com/open-telemetry/opentelemetry-specification/pull/226.
 */
export type SpanKind = 0 | 1 | 2 | 3 | 4;
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext = [number, number, boolean, number, number, boolean];
/**
 * Represents the canonical set of status codes of a finished Span.
 */
export type StatusCode = 0 | 1 | 2;
export type TLensedAttributeValue =
  | string
  | number
  | boolean
  | TLensedAttributeValue[]
  | {
      [k: string]: TLensedAttributeValue;
    }
  | null;
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext1 = [number, number, boolean, number, number, boolean];
export type TJSONLike =
  | TJSONBase
  | TJSONLike[]
  | {
      [k: string]: TJSONLike;
    };
export type TJSONBase = string | number | null;
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext2 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext3 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext4 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext5 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext6 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext7 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext8 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext9 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext10 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext11 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext12 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext13 = [number, number, boolean, number, number, boolean];
/**
 * SpanContext that can be hashed.  Does not change data layout or behaviour. Changing SpanContext `__class__` with this should be safe.
 *
 * @minItems 6
 * @maxItems 6
 */
export type SpanContext14 = [number, number, boolean, number, number, boolean];

export interface _Master_ {
  Span: Span;
  SpanAgent: SpanAgent;
  SpanEmbedding: SpanEmbedding;
  SpanLLM: SpanLLM;
  SpanMemory: SpanMemory;
  SpanMethodCall: SpanMethodCall;
  SpanOther: SpanOther;
  SpanReranker: SpanReranker;
  SpanRetriever: SpanRetriever;
  SpanRoot: SpanRoot;
  SpanTask: SpanTask;
  SpanTool: SpanTool;
  TransSpanRecordAppCall: TransSpanRecordAppCall;
  SpanUntyped: SpanUntyped;
  TransSpanRecord: TransSpanRecord;
  [k: string]: unknown;
}
/**
 * Base Span type.
 *
 * Smallest unit of recorded activity.
 */
export interface Span {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  [k: string]: unknown;
}
/**
 * An agent invocation.
 */
export interface SpanAgent {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext1 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  description: string;
  [k: string]: unknown;
}
/**
 * An embedding cal.
 */
export interface SpanEmbedding {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext2 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  input_text: string;
  model_name: string;
  embedding: number[];
  [k: string]: unknown;
}
/**
 * A generation call to an LLM.
 */
export interface SpanLLM {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext3 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  model_name: string;
  model_type: string;
  input_token_count: number;
  input_messages: {
    [k: string]: unknown;
  }[];
  output_token_count: number;
  output_messages: {
    [k: string]: unknown;
  }[];
  temperature: number;
  cost: number;
  [k: string]: unknown;
}
/**
 * A memory call.
 */
export interface SpanMemory {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext4 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  memory_type: string;
  remembered: string;
  [k: string]: unknown;
}
/**
 * Span which corresponds to a method call.
 *
 * See also temporary development attributes in
 * [TransSpanRecordAppCall][trulens_eval.trace.span.TransSpanRecordAppCall].
 */
export interface SpanMethodCall {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext5 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  [k: string]: unknown;
}
/**
 * Other uncategorized spans.
 */
export interface SpanOther {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext6 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  [k: string]: unknown;
}
/**
 * A reranker call.
 */
export interface SpanReranker {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext7 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  query_text: string;
  model_name: string;
  top_n: number;
  input_context_texts: string[];
  input_context_scores: number[] | null;
  output_ranks: number[];
  [k: string]: unknown;
}
/**
 * A retrieval.
 */
export interface SpanRetriever {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext8 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  query_text: string;
  query_embedding: number[];
  distance_type: string;
  num_contexts: number;
  retrieved_contexts: string[];
  retrieved_scores: number[];
  retrieved_embeddings: number[][];
  [k: string]: unknown;
}
/**
 * A root span encompassing some collection of spans.
 *
 * Does not indicate any particular activity by itself beyond its children.
 */
export interface SpanRoot {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext9 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  [k: string]: unknown;
}
/**
 * A task invocation.
 */
export interface SpanTask {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext10 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  [k: string]: unknown;
}
/**
 * A tool invocation.
 */
export interface SpanTool {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext11 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  description: string;
  [k: string]: unknown;
}
/**
 * A Span which corresponds to single
 * [RecordAppCall][trulens_eval.schema.record.RecordAppCall].
 *
 * Features references to the call.
 *
 * !!! note
 *     This is a transitional type for the traces work. The non-transitional
 *     fields are being placed in
 *     [SpanMethodCall][trulens_eval.trace.span.SpanMethodCall] instead.
 */
export interface TransSpanRecordAppCall {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext12 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  inputs: {
    [k: string]: unknown;
  } | null;
  output: TJSONLike | null;
  error: unknown;
  [k: string]: unknown;
}
/**
 * Generic span type.
 *
 * This represents spans that are being recorded but have not yet been
 * determined to be of a particular type.
 */
export interface SpanUntyped {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext13 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  [k: string]: unknown;
}
/**
 * A span whose activity was recorded in a record.
 *
 * Features references to the record.
 */
export interface TransSpanRecord {
  /**
   * Name of span.
   */
  name: string;
  /**
   * Kind of span.
   */
  kind?: SpanKind & number;
  /**
   * Parent span context.
   *
   * None if no parent.
   */
  parent_context?: SpanContext14 | null;
  /**
   * Status of the span as per OpenTelemetry Span requirements.
   */
  status?: StatusCode & number;
  /**
   * Status description as per OpenTelemetry Span requirements.
   */
  status_description?: string | null;
  /**
   * Timestamp when the span's activity started in nanoseconds since epoch.
   */
  start_timestamp?: number;
  /**
   * Timestamp when the span's activity ended in nanoseconds since epoch.
   *
   * None if not yet ended.
   */
  end_timestamp?: number | null;
  /**
   * Unique immutable identifier for the span.
   *
   * @minItems 6
   * @maxItems 6
   */
  context: [number, number, boolean, number, number, boolean];
  /**
   * Events recorded in the span.
   *
   * !!! Warning
   *
   *     Events in OpenTelemetry seem to be synonymous to logs. Do not store
   *     anything we want to query or process in events.
   */
  events?: [unknown, unknown, unknown][];
  /**
   * Relationships to other spans with attributes on each link.
   */
  links?: [unknown, unknown][];
  /**
   * Attributes of span.
   */
  attributes?: {
    [k: string]: TLensedAttributeValue;
  };
  /**
   * View into a dict with keys prefixed by some `namespace` string.
   */
  attributes_metadata: {
    [k: string]: unknown;
  };
  tags: string[];
  span_type: null;
  record_id: string;
  [k: string]: unknown;
}
