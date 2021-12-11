import { TraceContextOptions, TraceContext } from '@src/TraceContext';

describe('TraceContext toString TestSuite', () => {
    it('should successfully stringify trace context', () => {
        const expectedJson: TraceContextOptions = {
            traceId: 'expectedtraceid',
            parentSpanId: 'expectedparentspanid',
            spanId: 'expectedspanid',
            sampled: 1,
        };

        const traceCtx = new TraceContext(expectedJson);

        expect(traceCtx.toString()).toMatch(expectedJson.traceId);
        expect(traceCtx.toString()).toMatch(expectedJson.parentSpanId);
        expect(traceCtx.toString()).toMatch(expectedJson.spanId);
        expect(traceCtx.toString()).toMatch(Number(expectedJson.sampled).toString());
    });
});
