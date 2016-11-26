import { Axis } from "./axis";
import { AxisPoint } from "./axis-point";
import { YPoint } from "./point/y-point";

export class YAxis<T> extends Axis<T> {

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
            let p = new YPoint(this.toStringer.stringify(point.Value));
            p.x = 400;
            p.y = point.Pos;
            this.addChild(p);
        });
    }
}
