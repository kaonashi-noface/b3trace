import { initializeTraceContext } from '@src/index';

describe('b3trace module initializeTraceContext TestSuite', () => {
    it('should continue Trace with propagated ids', () => {
        const incomingTraceId = 'someexpectedtraceid';
        const incomingSpanId = 'someexpectedspanid';
        const incomingParentSpanId = 'someexpectedparentspanid';

        const traceCtx = initializeTraceContext({
            traceId: incomingTraceId,
            spanId: incomingSpanId,
            parentSpanId: incomingParentSpanId,
        });

        expect(traceCtx.getTraceId()).toEqual(incomingTraceId);
        expect(traceCtx.getSpanId()).toEqual(incomingSpanId);
        expect(traceCtx.getParentSpanId()).toEqual(incomingParentSpanId);
    });

    it('should continue Trace without propagated ids', () => {
        const incomingTraceId = 'someexpectedtraceid';
        const incomingSpanId = 'someexpectedspanid';
        const incomingParentSpanId = 'theparentspanshouldnotmatterid';

        const traceCtx = initializeTraceContext(
            {
                traceId: incomingTraceId,
                spanId: incomingSpanId,
                parentSpanId: incomingParentSpanId,
            },
            false
        );

        expect(traceCtx.getTraceId()).toEqual(incomingTraceId);
        expect(traceCtx.getParentSpanId()).toEqual(incomingSpanId);
        expect(traceCtx.getSpanId()).toHaveLength(16);
        expect(traceCtx.getSpanId()).not.toEqual(incomingSpanId);
    });
});
