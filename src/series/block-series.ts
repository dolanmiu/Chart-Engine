import * as PIXI from "pixi.js";
import { ISeriesNode } from "./node";

export class BlockSeries extends PIXI.Graphics {
    private nodes: Array<ISeriesNode>;

    constructor() {
        super();
        this.nodes = new Array<ISeriesNode>();
    }

    public draw() {
        this.clear();
    }
}
