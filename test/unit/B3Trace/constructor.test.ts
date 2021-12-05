import { B3Trace } from '@src/B3Trace';

describe('B3Trace constructor TestSuite', () => {
    it('should successfully create a B3 Trace root with 32 length trace id', () => {
        const trace = new B3Trace();
        const { parentSpanId, traceId, spanId } = trace.toJson();

        expect(parentSpanId).toBeNull();
        expect(traceId).toHaveLength(32);
        expect(spanId).toHaveLength(16);
    });

    it('should successfully create a B3 Trace root with 16 length trace id', () => {
        const trace = new B3Trace({ is128BitId: false });
        const { parentSpanId, traceId, spanId } = trace.toJson();

        expect(parentSpanId).toBeNull();
        expect(traceId).toHaveLength(16);
        expect(spanId).toHaveLength(16);
    });
});
