import { Axis } from "./axis";
import { AxisPoint } from "./axis-point";
import { YPoint } from "./point/y-point";
import { GraphicsUtil } from "../../common/graphics-util";

export class YAxis<T> extends Axis<T> {

    public setPoints(points: Array<AxisPoint<T>>, startValue: T, endValue: T): void {
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
            let p = new YPoint(this.toStringer.stringify(point.Value));
            p.y = GraphicsUtil.convertToDrawableHeight(point.PosRatio);
            this.addChild(p);
        });
    }
}
