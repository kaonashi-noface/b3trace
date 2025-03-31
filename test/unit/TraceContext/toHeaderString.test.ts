import { create, from } from "@src/index";
import { EB3Headers, toHeaderString } from "@src/TraceContext";

describe("TestSuite - TraceContext.toHeaderString module", () => {
    it("should successfully stringify new trace context to b3 header string", () => {
        const traceCtx = create();
        const expectedHeaderString = `${traceCtx.traceId}-${traceCtx.spanId}`

        const actualHeaderString = toHeaderString(traceCtx);
        
        expect(actualHeaderString).toEqual(expectedHeaderString);
    });

    it("should successfully stringify full trace context to b3 header string", () => {
        const expectedTraceId = "expectedtraceid";
        const expectedParentSpanId = "expectedparentspanid";
        const expectedSpanId = "expectedspanid";
        const expectedSample = "1";
        const expectedHeaderString = [
            expectedTraceId,
            expectedSpanId,
            expectedSample,
            expectedParentSpanId,
        ].join("-");

        const headers = new Headers({
            [EB3Headers.X_B3_TRACEID]: expectedTraceId,
            [EB3Headers.X_B3_PARENTSPANID]: expectedParentSpanId,
            [EB3Headers.X_B3_SPANID]: expectedSpanId,
            [EB3Headers.X_B3_SAMPLED]: expectedSample,
        });
        const traceCtx = from(headers);

        const actualHeaderString = toHeaderString(traceCtx);
        
        expect(actualHeaderString).toEqual(expectedHeaderString);
    });
});
