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

        this.points.x.forEach(point => {
            this.moveTo(point.Pos, 0);
            this.lineTo(point.Pos, screenHeight);
        });

        this.points.y.forEach(point => {
            this.moveTo(0, point.Pos);
            this.lineTo(screenWidth, point.Pos);
        });

        this.endFill();
    }

    set xPoints(value: Array<AxisPoint<T>>) {
        this.points.x = value;
    }
}
