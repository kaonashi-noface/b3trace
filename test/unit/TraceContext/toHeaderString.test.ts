import { TraceContext } from '@src/TraceContext';

describe('TraceContext toHeaderString TestSuite', () => {
    it('should successfully stringify trace context to b3 header string', () => {
        const expectedTraceId = 'expectedtraceid';
        const expectedParentSpanId = 'expectedparentspanid';
        const expectedSpanId = 'expectedspanid';
        const expectedSample = '1';

        const traceCtx = new TraceContext({
            traceId: expectedTraceId,
            parentSpanId: expectedParentSpanId,
            spanId: expectedSpanId,
            sampled: expectedSample,
        });

        const actualHeaderString = traceCtx.toHeaderString();
        const expectedHeaderString = [
            expectedTraceId,
            expectedSpanId,
            expectedSample,
            expectedParentSpanId,
        ].join('-');

        expect(actualHeaderString).toEqual(expectedHeaderString);
    });
});
