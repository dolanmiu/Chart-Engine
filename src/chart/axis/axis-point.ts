import { GraphicsUtil } from "../../common/graphics-util";

export class AxisPoint<T> {
    private pos: number;

    constructor(private value: T, pos: number) {
        this.pos = GraphicsUtil.convertToDrawable(pos);
    }

    get Pos() {
        return this.pos;
    }

    get Value() {
        return this.value;
    }
}
