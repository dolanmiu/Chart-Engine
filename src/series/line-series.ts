import * as PIXI from "pixi.js";
import { ISeriesNode } from "./node";
import { ICoordinate } from "./coordinate";

export class LineSeries extends PIXI.Graphics implements ISeriesNode {

    private coordinates: Array<ICoordinate>;

    constructor() {
        super();
    }

    draw() {
        this.clear();

        this.coordinates.forEach((coordinate, i) => {
            if (i === 0) {
                this.moveTo(coordinate.x, coordinate.y);
            }

            this.lineTo(coordinate.x, coordinate.y);
        });
    }
}
