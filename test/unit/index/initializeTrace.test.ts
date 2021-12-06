import { initializeTrace } from '@src/index';

describe('b3trace module initializeTrace TestSuite', () => {
    it('should initialize Trace root with 32 length trace id', () => {
        const traceCtx = initializeTrace();

        expect(traceCtx.getParentSpanId()).toBeFalsy();
        expect(traceCtx.getTraceId()).toHaveLength(32);
        expect(traceCtx.getSpanId()).toHaveLength(16);
    });

    it('should initialize Trace root with 16 length trace id', () => {
        const traceCtx = initializeTrace(false);

        expect(traceCtx.getParentSpanId()).toBeFalsy();
        expect(traceCtx.getTraceId()).toHaveLength(16);
        expect(traceCtx.getSpanId()).toHaveLength(16);
    });
});
