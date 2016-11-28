import * as PIXI from "pixi.js";
import { GraphicsUtil } from "../../common/graphics-util";
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
            let xPos = GraphicsUtil.convertToDrawable(point.PosRatio * screenWidth);

            this.moveTo(xPos, 0);
            this.lineTo(xPos, screenHeight);
        };

        for (let point of this.points.y) {
            let yPos = GraphicsUtil.convertToDrawable(point.PosRatio * screenHeight);

            this.moveTo(0, yPos);
            this.lineTo(screenWidth, yPos);
        };

        this.endFill();
    }

    setPoints(xPoints: Array<AxisPoint<T>>, yPoints: Array<AxisPoint<V>>) {
        this.points.x = xPoints;
        this.points.y = yPoints;
    }
}
