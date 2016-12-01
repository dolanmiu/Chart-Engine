import { Axis } from "./axis";
import { AxisPoint } from "./axis-point";
import { XPoint } from "./point/x-point";
import { GraphicsUtil } from "../../common/graphics-util";

export class XAxis<T> extends Axis<T> {

    setPoints(points: Array<AxisPoint<T>>, startValue: T, endValue: T, length: number) {
        if (!points || points.length === 0) {
            return;
        }

        this.startValue = startValue;
        this.endValue = endValue;

        for (let child of this.children) {
            child.destroy();
        }
        this.removeChildren();

        points.forEach(point => {
            let p = new XPoint(this.toStringer.stringify(point.Value));
            p.x = GraphicsUtil.convertToDrawable(point.PosRatio * length);
            this.addChild(p);
        });
    }
}
