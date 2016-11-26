import { Axis } from "./axis";
import { AxisPoint } from "./axis-point";
import { XPoint } from "./point/x-point";

export class XAxis<T> extends Axis<T> {

    setPoints(points: Array<AxisPoint<T>>, startValue: T, endValue: T) {
        if (!points || points.length === 0) {
            return;
        }

        this.startValue = startValue;
        this.endValue = endValue;

        this.removeChildren();

        for (let child of this.children) {
            child.destroy();
        }

        points.forEach(point => {
            let p = new XPoint(this.toStringer.stringify(point.Value));
            p.x = point.Pos;
            p.y = 400;
            this.addChild(p);
        });
    }
}
