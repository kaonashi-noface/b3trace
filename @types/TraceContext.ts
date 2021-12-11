/**
 * The sampling state of the TraceContext. This flag tells the Tracing system whether the current
 * TraceContext should be captured in the tracing system.
 *
 * Visit the following link for information about SampleState:
 * https://github.com/openzipkin/b3-propagation#sampling-state
 */
type SampledState = 'true' | true | '1' | 1 | 'false' | false | '0' | 0 | 'd';
/**
 * TODO:
 */
type TraceContextOptions = {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    sampled?: SampledState;
};
/**
 * The JSON representation of a TraceContext.
 */
type TraceContextJson = {
    parentSpanId: string;
    traceId: string;
    spanId: string;
    sampled: SampledState;
};

interface ITraceContext {
    createChildContext(): TraceContext;
    getParentContext(): TraceContext;

    getTraceId(): string;
    getParentSpanId(): string;
    getSpanId(): string;
    getSampled(): SampledState;

    toHeaderString(): string;
    toJson(): TraceContextJson;
    toString(): string;
}

/**
 * TODO:
 * The Object representation of a TraceContext. A Trace Context is constructed
 */
declare class TraceContext implements ITraceContext {
    /**
     * Generates a hexadecimal identifier that is of length 32 or 16 depending on the B3Trace root's configuration.
     *
     * @param is128BitId flag that determines if the identifer should be length 32 or 16. If `is128BitId` is `true`,
     * the identifer length is 32. If `is128BitId` is `false`, the identifer length is 16.
     * @returns a hexadecimal identifier of length 32 or 16.
     */
    static generateId(is128BitId: boolean): string;
    /**
     * TODO:
     * @param {TraceContextOptions} args
     */
    constructor(args: TraceContextOptions);
    /**
     * Constructs and composes a child TraceContext from this current TraceContext. The trace identifier
     * @returns
     */
    createChildContext(): TraceContext;
    /**
     * Constructs and composes a child TraceContext from this current TraceContext. The trace identifier
     * @returns the parent of this TraceContext. A null parent TraceContext indicates that the the current
     * TraceContext is the root of the current span. A null parent TraceContext does not mean that the
     * current TraceContext is the head of the entire Trace since information is lost across spans of a
     * distributed system.
     */
    getParentContext(): TraceContext;
    /**
     * The trace identifier of the current Trace Context - which the same across the entire Trace.
     * The length of the trace identifier depends on the `is128BitId` flag. If `is128BitId` is true,
     * the trace identifier will be a hexadecimal string with length 32. If `is128BitId` is false,
     * the trace identifier will be a hexadecimal string with length 16.
     *
     * @returns the trace identifier of the current Trace Context
     */
    getTraceId(): string;
    /**
     * The parent span's identifier of the current Trace Context. The parent span's identifier will
     * always be a hexadecimal string with length 16.
     *
     * @returns the parent span's identifier of the current Trace Context
     */
    getParentSpanId(): string;
    /**
     * The span identifier of the current Trace Context. The span's identifier will always be a
     * hexadecimal string with length 16.
     *
     * @returns the parent span's identifier of the current Trace Context
     */
    getSpanId(): string;
    /**
     * The sampling state of the current Trace Context. The sampling state of this TraceContext
     *
     * Visit the following link for information about SampleState:
     * https://github.com/openzipkin/b3-propagation#sampling-state
     *
     * @returns the parent span's identifier of the current Trace Context
     */
    getSampled(): SampledState;
    /**
     * @returns the b3 header compressed to a string. This header string is meant to occupy the b3
     * header key.
     */
    toHeaderString(): string;
    /**
     * @returns the JSON representation of this TraceContext.
     */
    toJson(): TraceContextJson;
    /**
     * @returns the unformatted JSON result from the `.toJson()` member function as a string
     */
    toString(): string;
}

export { SampledState, TraceContextOptions, TraceContextJson, ITraceContext, TraceContext };
