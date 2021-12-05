import { B3Trace } from '@src/B3Trace';

describe('B3Trace constructor TestSuite', () => {
    it('should successfully construct B3 Trace root with 32 length trace id', () => {
        const trace = new B3Trace();

        expect(trace.getParentSpan()).toBeFalsy();
        expect(trace.getTraceId()).toHaveLength(32);
        expect(trace.getSpanId()).toHaveLength(16);
    });

    it('should successfully construct B3 Trace root with 16 length trace id', () => {
        const trace = new B3Trace({ is128BitId: false });

        expect(trace.getParentSpan()).toBeFalsy();
        expect(trace.getTraceId()).toHaveLength(16);
        expect(trace.getSpanId()).toHaveLength(16);
    });

    it('should successfully construct B3 Trace subtree with propagated ids', () => {
        const incomingTraceId = 'someexpectedtraceid';
        const incomingSpanId = 'someexpectedspanid';
        const incomingParentSpanId = 'someexpectedparentspanid';

        const trace = new B3Trace({
            parentSpanId: incomingParentSpanId,
            traceId: incomingTraceId,
            spanId: incomingSpanId,
        });

        expect(trace.getParentSpanId()).toEqual(incomingParentSpanId);
        expect(trace.getTraceId()).toEqual(incomingSpanId);
        expect(trace.getSpanId()).toEqual(incomingTraceId);
    });

    it('should successfully construct B3 Trace subtree without propagated ids', () => {
        const incomingTraceId = 'someexpectedtraceid';
        const incomingSpanId = 'someexpectedspanid';
        const incomingParentSpanId = 'theparentspanshouldnotmatterid';

        const trace = new B3Trace({
            isPropagated: false,
            parentSpanId: incomingParentSpanId,
            traceId: incomingTraceId,
            spanId: incomingTraceId,
        });

        expect(trace.getParentSpanId()).not.toEqual(incomingParentSpanId);
        expect(trace.getParentSpanId()).toEqual(incomingSpanId);
        expect(trace.getTraceId()).toEqual(incomingSpanId);
        expect(trace.getSpanId()).toHaveLength(16);
        expect(trace.getSpanId()).not.toEqual(incomingSpanId);
    });
});
