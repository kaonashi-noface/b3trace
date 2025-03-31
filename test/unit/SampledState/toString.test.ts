import { ESampledState, toString } from "@src/SampledState";

describe("TestSuite - SampledState.toString module", () => {
    it("should return \"1\" when SampledState=ACCEPT", () => {
        const actualEnumStr = toString(ESampledState.ACCEPT);
        expect(actualEnumStr).toStrictEqual("1");
    });

    it("should return \"0\" when SampledState=DENY", () => {
        const actualEnumStr = toString(ESampledState.DENY);
        expect(actualEnumStr).toStrictEqual("0");
    });

    it("should return \"d\" when SampledState=DEBUG", () => {
        const actualEnumStr = toString(ESampledState.DEBUG);
        expect(actualEnumStr).toStrictEqual("d");
    });

    it("should return null when SampledState=DEFER", () => {
        const actualEnumStr = toString(ESampledState.DEFER);
        expect(actualEnumStr).toBeNull();
    });
});
