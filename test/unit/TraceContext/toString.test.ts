import { from } from "@src/index";
import { TraceContextJson, EB3Headers, toString } from "@src/TraceContext";

describe("TestSuite - TraceContext.toString module", () => {
    it("should successfully stringify trace context", () => {
        const expectedJson: TraceContextJson = {
            traceId: "someexpectedtraceid",
            parentSpanId: "someexpectedparentspanid",
            spanId: "someexpectedspanid",
            sampled: "1",
        };
        const headers = new Headers({
            [EB3Headers.X_B3_TRACEID]: expectedJson.traceId,
            [EB3Headers.X_B3_PARENTSPANID]: expectedJson.parentSpanId,
            [EB3Headers.X_B3_SPANID]: expectedJson.spanId,
            [EB3Headers.X_B3_SAMPLED]: expectedJson.sampled,
        });
        const traceCtx = from(headers);
        const actualJson = toString(traceCtx);

        expect(actualJson).toMatch(expectedJson.traceId);
        expect(actualJson).toMatch(expectedJson.parentSpanId);
        expect(actualJson).toMatch(expectedJson.spanId);
        expect(actualJson).toMatch(expectedJson.sampled);
    });
});
