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

    public draw(screenHeight: number) {
        this.clear();
        this.lineStyle(1, 0x0000FF, 1);

        this.points.forEach(point => {
            this.moveTo(point.x, screenHeight);
            this.lineTo(point.x, screenHeight - 100);
            console.log(this.width);
        });

        this.endFill();
    }
}