import * as PIXI from "pixi.js";
import { ISeriesNode } from "./node";

export class BlockSeries extends PIXI.Graphics {
    private nodes: Array<ISeriesNode>;

    constructor() {
        super();
        this.nodes = new Array<ISeriesNode>();
    }

    draw() {
        this.clear();

        for (let node of this.nodes) {
            node.draw();
        }
    }
}
