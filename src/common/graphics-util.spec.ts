import { GraphicsUtil } from "./graphics-util";
import { assert } from "chai";

describe("GraphicsUtil", () => {

    it("should round 52 to 52.5", () => {
        let value = GraphicsUtil.convertToDrawableWidth(52);
        assert.equal(value, 52.5);
    });

    it("should round 49.7 tp 49.5", () => {
        let value = GraphicsUtil.convertToDrawableWidth(49.7);
        assert.equal(value, 49.5);
    });

    it("should round 49.2 tp 49.5", () => {
        let value = GraphicsUtil.convertToDrawableWidth(49.2);
        assert.equal(value, 49.5);
    });

    it("should round 49.5 tp 49.5", () => {
        let value = GraphicsUtil.convertToDrawableWidth(49.5);
        assert.equal(value, 49.5);
    });
});
