type SampledState = 'true' | true | 1 | 'false' | false | 0 | 'd';

type TraceContextOptions = {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    sampled?: SampledState;
};

type TraceContextJson = {
    parentSpanId: string;
    traceId: string;
    spanId: string;
    sampled: SampledState;
};

interface ITraceContext {
    createChildContext(): TraceContext;

    getTraceId(): string;
    getParentSpanId(): string;
    getSpanId(): string;
    getSampled(): SampledState;

    toHeaderString(): string;
    toJson(): TraceContextJson;
    toString(): string;
}

declare class TraceContext implements ITraceContext {
    /**
     * Generates a hexadecimal identifier that is of length 32 or 16 depending on the B3Trace root's configuration.
     *
     * @param is128BitId flags that determines if the identifer should be length 32 or 16. If `is128BitId` is `true`, the identifer length is 32.
     * If `is128BitId` is `false`, the identifer length is 16.
     * @returns a hexadecimal identifier of length 32 or 16.
     */
    static generateId(is128BitId: boolean);

    /**
     *
     * @param {Partial<TraceContextOptions>} args
     */
    constructor(args: TraceContextOptions);

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
    getSampled(): SampledState;

    toHeaderString(): string;
    toJson(): TraceContextJson;
    /**
     * @returns the unformatted JSON result from the `.toJson()` member function as a string
     */
    toString(): string;
}

export { SampledState, TraceContextOptions, TraceContextJson, ITraceContext, TraceContext };
