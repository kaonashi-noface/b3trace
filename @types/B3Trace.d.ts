type B3TraceOptions = {
    is128BitId: boolean;
    isPropagated: boolean;
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
    getRootSpan(): B3Trace;
    getParentSpan(): B3Trace;

    getTraceId(): string;
    getParentSpanId(): string;
    getSpanId(): string;

    toHeaderString(): string;
    toJson(): B3TraceJson;
    toString(): string;
}

declare class B3Trace implements IB3Trace {
    getRootSpan(): B3Trace;
    getParentSpan(): B3Trace;

    getTraceId(): string;
    getParentSpanId(): string;
    getSpanId(): string;

    toHeaderString(): string;
    toJson(): B3TraceJson;
    toString(): string;
}

export { B3TraceOptions, B3TraceJson, IB3Trace, B3Trace };
