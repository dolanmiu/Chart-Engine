import * as PIXI from "pixi.js";

export class ChartMask extends PIXI.Graphics {

    constructor(screenWidth: number, screenHeight: number) {
        super();
        this.beginFill(0x00FF00);
        this.drawRect(0, 0, screenWidth - 50, screenHeight - 50);
        this.endFill();
    }
}