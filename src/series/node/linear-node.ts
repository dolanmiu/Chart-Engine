import * as PIXI from "pixi.js";
import { ICoordinate } from "../coordinate";
import { ISeriesNode } from "./node";

export abstract class LinearNode extends PIXI.Graphics implements ISeriesNode {
    private xAxisPos: number;
    private coordinates: Array<ICoordinate>;

    constructor(x: number) {
        super();
        this.coordinates = new Array<ICoordinate>();
        this.xAxisPos = x;
    }

    draw() {
        this.clear();
        for (let coordinate of this.coordinates) {
            this.moveTo(this.xAxisPos, coordinate.y);
        }
    }
}
