import { create } from "@src/index";

describe("TestSuite - b3trace.create module", () => {
    it("should create Trace root with 32 length trace id", () => {
        const traceCtx = create();

        expect(traceCtx.parent).toBeFalsy();
        expect(traceCtx.traceId).toHaveLength(32);
        expect(traceCtx.spanId).toHaveLength(16);
    });

    it("should create Trace root with 16 length trace id", () => {
        const traceCtx = create(false);

        expect(traceCtx.parent).toBeFalsy();
        expect(traceCtx.traceId).toHaveLength(16);
        expect(traceCtx.spanId).toHaveLength(16);
    });
});
