import { from } from "@src/index";
import { ESampledState } from "@src/SampledState";
import { EB3Headers } from "@src/TraceContext";

describe("TestSuite - b3trace.from module", () => {
    it("should propagate Trace", () => {
        const incomingTraceId = "someexpectedtraceid";
        const incomingParentSpanId = "someexpectedparentspanid";
        const incomingSpanId = "someexpectedspanid";
        const headers = new Headers({
            [EB3Headers.X_B3_TRACEID]: incomingTraceId,
            [EB3Headers.X_B3_PARENTSPANID]: incomingParentSpanId,
            [EB3Headers.X_B3_SPANID]: incomingSpanId,
        });
        const traceCtx = from(headers);

        expect(traceCtx.traceId).toEqual(incomingTraceId);
        expect(traceCtx.parentSpanId).toEqual(incomingParentSpanId);
        expect(traceCtx.spanId).toEqual(incomingSpanId);
        expect(traceCtx.sampled).toEqual(ESampledState.DEFER);
    });

    it("should propagate not Trace", () => {
        const incomingTraceId = "someexpectedtraceid";
        const incomingParentSpanId = "theparentspanshouldnotmatterid";
        const incomingSpanId = "someexpectedspanid";
        const headers = new Headers({
            [EB3Headers.X_B3_TRACEID]: incomingTraceId,
            [EB3Headers.X_B3_PARENTSPANID]: incomingParentSpanId,
            [EB3Headers.X_B3_SPANID]: incomingSpanId,
        });
        const traceCtx = from(headers, false);

        expect(traceCtx.traceId).toEqual(incomingTraceId);
        expect(traceCtx.parentSpanId).toEqual(incomingSpanId);
        expect(traceCtx.spanId).toHaveLength(16);
        expect(traceCtx.spanId).not.toEqual(incomingSpanId);
        expect(traceCtx.sampled).toEqual(ESampledState.DEFER);
    });
});
