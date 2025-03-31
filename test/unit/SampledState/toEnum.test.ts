import { ESampledState, toEnum } from "@src/SampledState";

describe("TestSuite - SampledState.toEnum module", () => {
    it("should return ACCEPT when SampledState=1", () => {
        const actualEnum = toEnum("1");
        expect(actualEnum).not.toBeNull();
        expect(actualEnum).not.toBeUndefined();
        expect(actualEnum).toEqual(ESampledState.ACCEPT);
    });

    it("should return ACCEPT when SampledState=true (legacy)", () => {
        const actualEnum = toEnum("true");
        expect(actualEnum).not.toBeNull();
        expect(actualEnum).not.toBeUndefined();
        expect(actualEnum).toEqual(ESampledState.ACCEPT);
    });

    it("should return DENY when SampledState=0", () => {
        const actualEnum = toEnum("0");
        expect(actualEnum).not.toBeNull();
        expect(actualEnum).not.toBeUndefined();
        expect(actualEnum).toEqual(ESampledState.DENY);
    });

    it("should return DENY when SampledState=false (legacy)", () => {
        const actualEnum = toEnum("false");
        expect(actualEnum).not.toBeNull();
        expect(actualEnum).not.toBeUndefined();
        expect(actualEnum).toEqual(ESampledState.DENY);
    });

    it("should return DEBUG when SampledState=d", () => {
        const actualEnum = toEnum("d");
        expect(actualEnum).not.toBeNull();
        expect(actualEnum).not.toBeUndefined();
        expect(actualEnum).toEqual(ESampledState.DEBUG);
    });

    it("should return DEFER when SampledState is missing", () => {
        const actualEnum = toEnum();
        expect(actualEnum).not.toBeNull();
        expect(actualEnum).not.toBeUndefined();
        expect(actualEnum).toEqual(ESampledState.DEFER);
    });

    it("should return DEFER when SampledState is invalid value", () => {
        const actualEnum = toEnum("some-invalid-value");
        expect(actualEnum).not.toBeNull();
        expect(actualEnum).not.toBeUndefined();
        expect(actualEnum).toEqual(ESampledState.DEFER);
    });
});
