type TraceContextOptions = {
    is128BitId: boolean;
    isPropagated: boolean;
    parentSpanId;
    traceId: string;
    spanId: string;
};

type TraceContextJson = {
    parentSpanId: string;
    traceId: string;
    spanId: string;
    sampled: boolean;
    debug: boolean;
};

interface ITraceContext {
    createChildContext(): TraceContext;

    getTraceId(): string;
    getParentSpanId(): string;
    getSpanId(): string;

    toHeaderString(): string;
    toJson(): TraceContextJson;
    toString(): string;
}

declare class TraceContext implements ITraceContext {
    /**
     *
     * @param {Partial<TraceContextOptions>} args
     */
    constructor({ is128BitId, isPropagated, ...args }?: Partial<TraceContextOptions>);

    createChildContext(): TraceContext;

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

    toHeaderString(): string;
    toJson(): TraceContextJson;
    /**
     * @returns the unformatted JSON result from the `.toJson()` member function as a string
     */
    toString(): string;
}

export { TraceContextOptions, TraceContextJson, ITraceContext, TraceContext };
