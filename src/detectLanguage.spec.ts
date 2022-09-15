import { detectLanguage } from './detectLanguage';

describe("DetectLanguage", () => {
    it("detectLanguage returns undefined without browser environment", () => {
        var result = detectLanguage();
        expect(result).toBeUndefined();
    });

    /*
     * Tests disabled until we find a good way to inject window. Manually tested for now - RA.
     *
    it("detectLanguage returns a string with length 2", () => {
        var result = detectLanguage();
        expect(result?.length).toEqual(2);
    });

    it("detectLanguage returns a lowercase string", () => {
        var result = detectLanguage();
        expect(result).toEqual(result.toLowerCase());
    })
    */
});

