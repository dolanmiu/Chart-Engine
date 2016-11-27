import * as PIXI from "pixi.js";

import { AxisPoint } from "../axis";

export class Grid<T, V> extends PIXI.Graphics {

    private points: {
        x: Array<AxisPoint<T>>,
        y: Array<AxisPoint<V>>,
    };

    constructor(private xSpacing: number, private ySpacing: number) {
        super();
        this.points = {
            x: [],
            y: []
        };
    }

    public draw(screenWidth: number, screenHeight: number) {
        this.clear();
        this.lineStyle(1, 0x0000FF, 1);

        for (let point of this.points.x) {
            this.moveTo(point.Pos, 0);
            this.lineTo(point.Pos, screenHeight);
        };

        for (let point of this.points.y) {
            this.moveTo(0, point.Pos);
            this.lineTo(screenWidth, point.Pos);
        };

        this.endFill();
    }

    setPoints(xPoints: Array<AxisPoint<T>>, yPoints: Array<AxisPoint<V>>) {
        this.points.x = xPoints;
        this.points.y = yPoints;
    }
}
