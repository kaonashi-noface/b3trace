/**
 * You should be able to do the following with this module.
 *
 * Use Cases:
 * 1) construct the root span (aka begin the trace tree)
 * 2) construct a new child span
 * 3) get an existing span by name or id
 * 4) construct b3 header value (traceId-)
 */
import { TraceContextOptions } from '@types';
import { TraceContext } from '@src/TraceContext';

function initializeTrace(is128BitId = true) {
    const traceId = TraceContext.generateId(is128BitId);
    const spanId = TraceContext.generateId();
    return new TraceContext({ traceId, spanId });
}

function initializeTraceContext(args: TraceContextOptions, isPropagated = true) {
    if (isPropagated) {
        return new TraceContext({
            traceId: args.traceId,
            spanId: args.spanId,
            parentSpanId: args.parentSpanId,
            sampled: args.sampled,
        });
    } else {
        return new TraceContext({
            traceId: args.traceId,
            spanId: TraceContext.generateId(),
            parentSpanId: args.spanId,
            sampled: args.sampled,
        });
    }
}

export * from '@src/TraceContext';
export { initializeTrace, initializeTraceContext };
