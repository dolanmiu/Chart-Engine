import * as PIXI from "pixi.js";

import { DateRangeTransformer, TimeUnit } from "./date-range-transformer";
import { AxisPoint } from "../axis/axis-point";
export class Grid<T, V> extends PIXI.Graphics {

    private points: {
        x: Array<AxisPoint<T>>,
        y: Array<AxisPoint<V>>,
    };

    // add matrix (actual grid)
    constructor(private xSpacing: number, private ySpacing: number) {
        super();
        this.points = {
            x: [],
            y: []
        };
    }

    public draw(screenWidth: number, screenHeight: number) {
        let xCount = Math.ceil(screenWidth / this.xSpacing);
        let yCount = Math.ceil(screenHeight / this.ySpacing);

        this.lineStyle(1, 0x0000FF, 1);
        // this.beginFill(0x00FF00);

        /*for (let i = 0; i < xCount; i++) {
            this.moveTo(this.xSpacing * i + 0.5, 0);
            this.lineTo(this.xSpacing * i + 0.5, screenHeight);
        }*/
        this.points.x.forEach(point => {
            this.moveTo(point.x, 0);
            this.lineTo(point.x, screenHeight);
        });

        for (let i = 0; i < yCount; i++) {
            this.moveTo(0, this.ySpacing * i + 0.5);
            this.lineTo(screenWidth, this.ySpacing * i + 0.5);
        }

        this.endFill();
    }

    set xPoints(value: Array<AxisPoint<T>>) {
        this.points.x = value;
    }
}

export { DateRangeTransformer, TimeUnit }
