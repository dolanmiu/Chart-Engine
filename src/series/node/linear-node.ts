import * as PIXI from "pixi.js";
import { ISeriesNode } from "./node";

export abstract class LinearNode extends PIXI.Graphics implements ISeriesNode {
    private xAxisPos: number;
    private coordinates: Array<number>;

    constructor(x: number) {
        super();
        this.coordinates = new Array<number>();
        this.xAxisPos = x;
    }

    public draw(): void {
        this.clear();

        for (let coordinate of this.coordinates) {
            this.moveTo(this.xAxisPos, coordinate);
        }
    }
}
