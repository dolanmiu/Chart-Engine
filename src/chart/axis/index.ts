import * as PIXI from "pixi.js";

export interface AxisPoint {
    label: string | number;
    x: number;
}

export class Axis extends PIXI.Graphics {

}

export class XAxis<T> extends Axis {

    private points: Array<AxisPoint>;

    constructor() {
        super();
        this.points = new Array<AxisPoint>();
    }

    set Points(points: any) {
        if (!points) {
            return;
        }

        this.points = points;
    }

    public draw() {
        this.clear();
        this.lineStyle(1, 0x0000FF, 1);

        this.endFill();
    }
}