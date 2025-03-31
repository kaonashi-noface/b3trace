import { from } from "@src/index";
import { TraceContextJson, EB3Headers, toJson } from "@src/TraceContext";

describe("TestSuite - TraceContext.toJson module", () => {
    it("should successfully parse trace context to JSON", () => {
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
        const actualJson = toJson(traceCtx);
        expect(actualJson).toEqual(expectedJson);
    });
});
