import { TraceContext } from '@src/TraceContext';

describe('B3Trace constructor TestSuite', () => {
    it('should successfully construct B3 Trace root with 32 length trace id', () => {
        const traceCtx = new TraceContext();

        expect(traceCtx.getParentSpanId()).toBeFalsy();
        expect(traceCtx.getTraceId()).toHaveLength(32);
        expect(traceCtx.getSpanId()).toHaveLength(16);
    });

    it('should successfully construct B3 Trace root with 16 length trace id', () => {
        const traceCtx = new TraceContext({ is128BitId: false });

        expect(traceCtx.getParentSpanId()).toBeFalsy();
        expect(traceCtx.getTraceId()).toHaveLength(16);
        expect(traceCtx.getSpanId()).toHaveLength(16);
    });

    it('should successfully construct B3 Trace subtree with propagated ids', () => {
        const incomingTraceId = 'someexpectedtraceid';
        const incomingSpanId = 'someexpectedspanid';
        const incomingParentSpanId = 'someexpectedparentspanid';

        const traceCtx = new TraceContext({
            traceId: incomingTraceId,
            spanId: incomingSpanId,
            parentSpanId: incomingParentSpanId,
        });

        expect(traceCtx.getTraceId()).toEqual(incomingTraceId);
        expect(traceCtx.getSpanId()).toEqual(incomingSpanId);
        expect(traceCtx.getParentSpanId()).toEqual(incomingParentSpanId);
    });

    it('should successfully construct B3 Trace subtree without propagated ids', () => {
        const incomingTraceId = 'someexpectedtraceid';
        const incomingSpanId = 'someexpectedspanid';
        const incomingParentSpanId = 'theparentspanshouldnotmatterid';

        const traceCtx = new TraceContext({
            isPropagated: false,
            traceId: incomingTraceId,
            spanId: incomingSpanId,
            parentSpanId: incomingParentSpanId,
        });

        expect(traceCtx.getTraceId()).toEqual(incomingTraceId);
        expect(traceCtx.getParentSpanId()).toEqual(incomingSpanId);
        expect(traceCtx.getSpanId()).toHaveLength(16);
        expect(traceCtx.getSpanId()).not.toEqual(incomingSpanId);
    });
});
