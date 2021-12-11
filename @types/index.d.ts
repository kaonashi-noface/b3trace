import { TraceContextOptions, TraceContext } from './TraceContext';

declare namespace b3trace {
    /**
     * Constructs a new TraceContext which is the head of a new Trace.
     * @param {boolean} is128BitId if true, the trace identifier of the new Trace will be a 32 length hexadecimal string.
     * if false, the trace identifier of the new Trace will be a 16 length hexadecimal string.
     */
    export function initializeTrace(is128BitId: boolean): TraceContext;
    /**
     * This method generates a new TraceContext given information from the previous Trace Conrtext by propagation
     * or composition. Propagation refers to the act of passing one property directly to the next corresponding
     * property (e.g. parentSpanId --> parentSpanId, spandId --> spandId, etc.). Composition refers to the act of
     * constructing a new TraceContext such that the child is composed of properties from the parent.
     * @param {TraceContextOptions} args properties from the previous TraceContext to construct the new TraceContext from.
     * @param {boolean} isPropagated if true, this method constructs and propagates information to a new TraceContext.
     * If false, this method constructs and composes information to a new TraceContext.
     */
    export function initializeTraceContext(
        args: TraceContextOptions,
        isPropagated: boolean
    ): TraceContext;
}

export * from './TraceContext';
export default b3trace;
