type B3TraceOptions = {
    is128BitId: boolean;
    isPropagated: boolean;
    parentSpanId;
    traceId: string;
    spanId: string;
};

type B3TraceJson = {
    parentSpanId: string;
    traceId: string;
    spanId: string;
    sampled: boolean;
    debug: boolean;
};

interface IB3Trace {
    getTraceId(): string;
    getParentSpanId(): string;
    getSpanId(): string;

    toHeaderString(): string;
    toJson(): B3TraceJson;
    toString(): string;
}

declare class B3Trace implements IB3Trace {
    /**
     *
     * @param {Partial<B3TraceOptions>} args
     */
    constructor({ is128BitId, isPropagated, ...args }?: Partial<B3TraceOptions>);

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
    toJson(): B3TraceJson;
    /**
     * @returns the unformatted JSON result from the `.toJson()` member function as a string
     */
    toString(): string;
}

export { B3TraceOptions, B3TraceJson, IB3Trace, B3Trace };
