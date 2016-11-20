import { DateRangeTransformer, TimeUnit } from "./date-range-transformer";
import { assert } from "chai";

describe("DateRangeTransformer", () => {
    let dateTransformer: DateRangeTransformer;

    beforeEach(() => {
        dateTransformer = new DateRangeTransformer();
    });

    it("should parse correctly", () => {
        let endDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        let array = dateTransformer.transform(new Date(), endDate, 500, TimeUnit.Minute);
        console.log(array);
        // assert.equal(array, undefined);
    });
});
