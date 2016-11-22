import * as PIXI from "pixi.js";
import { Point } from "./point";
import { AxisPoint } from "./axis-point";
import { IToStringer, StandardToStringer } from "../../common";
export class Axis extends PIXI.Graphics {

}

export class XAxis<T> extends Axis {

    private points: Array<Point>;
    private toStringer: IToStringer<T>;

    constructor(toStringer?: IToStringer<T>) {
        super();
        if (!toStringer) {
            this.toStringer = new StandardToStringer();
        }
        this.toStringer = toStringer;
        this.points = new Array<Point>();
    }

    set Points(points: Array<AxisPoint<T>>) {
        if (!points) {
            return;
        }
        // this.points = <Array<Point>>points;

        points.forEach(point => {
            let p = new Point(this.toStringer.stringify(point.Value));
            p.x = point.Pos;
            p.y = 400;
            this.points.push(p);
            this.addChild(p);
        });
    }

    public draw(screenHeight: number) {
        this.points.forEach(point => {
            point.draw(screenHeight);
        });
        /*this.lineStyle(1, 0x0000FF, 1);

        this.points.forEach(point => {
            this.moveTo(point.x, screenHeight);
            this.lineTo(point.x, screenHeight - 100);
        });

        this.endFill();*/
    }
}
