import { TraceContext } from '@src/TraceContext';

describe('B3Trace constructor TestSuite', () => {
    it('should successfully construct child trace context from B3 Trace', () => {
        const traceCtx = new TraceContext();
        const childCtx = traceCtx.createChildContext();

        expect(traceCtx.getParentSpanId()).toBeFalsy();
        expect(childCtx.getTraceId()).toEqual(traceCtx.getTraceId());
        expect(childCtx.getParentSpanId()).toEqual(traceCtx.getSpanId());
    });
});
