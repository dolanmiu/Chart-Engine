import * as PIXI from "pixi.js";
import { Point } from "./point";
import { AxisPoint } from "./axis-point";
import { IToStringer, StandardToStringer } from "../../common";

export class Axis extends PIXI.Graphics {

}

export class XAxis<T> extends Axis {

    private points: Array<Point>;
    private toStringer: IToStringer<T>;
    private startValue: T;
    private endValue: T;

    constructor(toStringer?: IToStringer<T>) {
        super();
        if (!toStringer) {
            this.toStringer = new StandardToStringer();
        }
        this.toStringer = toStringer;
        this.points = new Array<Point>();
    }

    setPoints(points: Array<AxisPoint<T>>, startValue: T, endValue: T) {
        if (!points || points.length === 0) {
            return;
        }
        // this.points = <Array<Point>>points;
        this.startValue = startValue;
        this.endValue = endValue;

        this.removeChildren();
        this.points = [];

        points.forEach(point => {
            let p = new Point(this.toStringer.stringify(point.Value));
            p.x = point.Pos;
            p.y = 400;
            this.points.push(p);
            this.addChild(p);
        });
    }

    get StartValue(): T {
        return this.startValue;
    }

    get EndValue(): T {
        return this.endValue;
    }

    public draw(screenHeight: number) {
        this.clear();

        this.points.forEach(point => {
            point.draw(screenHeight);
        });
    }
}
