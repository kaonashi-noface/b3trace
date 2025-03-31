import { from } from "@src/index";
import { toString } from "@src/SampledState";
import { EB3Headers, child } from "@src/TraceContext";

describe("TestSuite - TraceContext.child module", () => {
    it("should successfully construct child trace context from B3 Trace", () => {

        const incomingTraceId = "someexpectedtraceid";
        const incomingParentSpanId = "someexpectedparentspanid";
        const incomingSpanId = "someexpectedspanid";
        const incomingSampledState = "d";
        const headers = new Headers({
            [EB3Headers.X_B3_TRACEID]: incomingTraceId,
            [EB3Headers.X_B3_PARENTSPANID]: incomingParentSpanId,
            [EB3Headers.X_B3_SPANID]: incomingSpanId,
            [EB3Headers.X_B3_SAMPLED]: incomingSampledState,
        });
        const parentCtx = from(headers);
        const childCtx = child(parentCtx);

        expect(childCtx.traceId).toEqual(parentCtx.traceId);
        expect(childCtx.parentSpanId).toEqual(parentCtx.spanId);
        expect(childCtx.spanId).toHaveLength(16);
        expect(childCtx.spanId).not.toEqual(parentCtx.spanId);
        expect(childCtx.sampled).toEqual(parentCtx.sampled);
        expect(toString(childCtx.sampled)).toEqual(incomingSampledState);
    });
});