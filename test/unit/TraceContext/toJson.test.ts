import { TraceContextOptions, TraceContext } from '@src/TraceContext';

describe('TraceContext toJson TestSuite', () => {
    it('should successfully parse trace context to JSON', () => {
        const expectedJson: TraceContextOptions = {
            traceId: 'expectedtraceid',
            parentSpanId: 'expectedparentspanid',
            spanId: 'expectedspanid',
            sampled: 1,
        };

        const traceCtx = new TraceContext(expectedJson);

        expect(traceCtx.toJson()).toEqual(expectedJson);
    });
});
