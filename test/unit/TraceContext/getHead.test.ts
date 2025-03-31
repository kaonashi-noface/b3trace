import { create } from "@src/index";
import { child, getHead } from "@src/TraceContext";

describe("TestSuite - TraceContext.getHead module", () => {
    it("should fail to get root trace context from null B3 Trace", () => {
        expect(getHead(null)).toBeFalsy();
    });

    it("should get root trace context from B3 Trace", () => {
        const parentCtx = create();
        const childCtx1 = child(parentCtx);
        const childCtx2 = child(childCtx1);
        const childCtx3 = child(childCtx2);

        expect(childCtx3.parentSpanId).toEqual(childCtx2.spanId);
        expect(childCtx2.parentSpanId).toEqual(childCtx1.spanId);
        expect(childCtx1.parentSpanId).toEqual(parentCtx.spanId);

        expect(getHead(childCtx3).spanId).toEqual(parentCtx.spanId);
        expect(getHead(childCtx2).spanId).toEqual(parentCtx.spanId);
        expect(getHead(childCtx1).spanId).toEqual(parentCtx.spanId);
    });
});