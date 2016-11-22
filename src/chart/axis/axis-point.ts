import { GraphicsUtil } from "../../common/graphics-util";

export class AxisPoint<T> {
    private _pos: number;

    constructor(private value: T, pos: number) {
        this._pos = GraphicsUtil.convertToDrawable(pos);
    }

    get pos() {
        return this._pos;
    }
}
