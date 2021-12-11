import { initializeTrace } from '@src/index';

describe('TraceContext createChildContext TestSuite', () => {
    it('should successfully construct child trace context from B3 Trace', () => {
        const traceCtx = initializeTrace();
        const childCtx = traceCtx.createChildContext();

        expect(traceCtx.getParentSpanId()).toBeFalsy();
        expect(childCtx.getTraceId()).toEqual(traceCtx.getTraceId());

        expect(childCtx.getParentContext().getSpanId()).toEqual(traceCtx.getSpanId());
        expect(childCtx.getParentSpanId()).toEqual(traceCtx.getSpanId());
    });
});
