import { toEnum } from "@src/SampledState";
import { EB3Headers, TraceContext, generateId, child } from "@src/TraceContext";

/**
 * Constructs a new TraceContext without a parent.
 * This new TraceContext is the root of a new Trace.
 * 
 * @param is128Bit
 * If `true`, the trace identifier will be a 32 length hexadecimal string.
 * If `false`, the trace identifier will be a 16 length hexadecimal string.
 * @returns a TraceContext as the root of a new Trace
 */
export function create(is128Bit = true) : TraceContext {
    const traceId = generateId(is128Bit);
    const spanId = generateId();
    return { traceId, spanId };
}

/**
 * This method generates a new TraceContext from incoming trace headers by propagation or composition.
 * 
 * Propagation refers to the act of passing one property directly to its corresponding property 
 * (e.g. parentSpanId --> parentSpanId, spandId --> spandId, etc.).
 * 
 * Composition refers to the act of constructing a new TraceContext as a child of the incoming trace headers.
 * 
 * @param headers 
 * The HTTP request headers to build the B3 TraceContext from.
 * @param isPropagated
 * If `true`, the incoming trace headers are propagated and mapped directly to the new TraceContext.
 * If `false`, the new TraceContext is composed as a child of the incoming trace headers.
 * 
 * This means the new TraceContext will:
 * - adopt the incoming X-B3-SpanId as its parentSpanId
 * - generate a new 16 length hexadecimal string as its spanId
 * @returns a TraceContext with context of incoming trace headers
 */
export function from(headers: Headers, isPropagated = true): TraceContext {
    const parent: TraceContext = {
        traceId: headers.get(EB3Headers.X_B3_TRACEID),
        parentSpanId: headers.get(EB3Headers.X_B3_PARENTSPANID),
        spanId: headers.get(EB3Headers.X_B3_SPANID),
        sampled: toEnum(headers.get(EB3Headers.X_B3_SAMPLED)),
    };
    if (!isPropagated) {
        return child(parent);
    }
    return { ...parent };
}
