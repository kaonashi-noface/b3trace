import { TraceContextOptions, TraceContext } from './TraceContext';

declare namespace b3trace {
    export function initializeTrace(is128BitId: boolean): TraceContext;
    export function initializeTraceContext(
        args: TraceContextOptions,
        isPropagated: boolean
    ): TraceContext;
}

export * from './TraceContext';
export default b3trace;
