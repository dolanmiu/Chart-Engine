import * as PIXI from "pixi.js";

export class Grid extends PIXI.Graphics {

    constructor(private xSpacing: number, private ySpacing: number) {
        super();

        let myMask = new PIXI.Graphics();
        myMask.beginFill(0x00FF00);
        myMask.drawCircle(0, 0, 300);
        myMask.endFill();

        this.addChild(myMask);
        this.mask = myMask;
    }

    public draw(screenWidth: number, screenHeight: number) {
        let xCount = Math.ceil(screenWidth / this.xSpacing);
        let yCount = Math.ceil(screenHeight / this.ySpacing);

        this.lineStyle(1, 0x0000FF, 1);
        // this.beginFill(0x00FF00);

        for (let i = 0; i < xCount; i++) {
            this.moveTo(this.xSpacing * i + 0.5, 0);
            this.lineTo(this.xSpacing * i + 0.5, screenHeight);
        }

        for (let i = 0; i < yCount; i++) {
            this.moveTo(0, this.ySpacing * i + 0.5);
            this.lineTo(screenWidth, this.ySpacing * i + 0.5);
        }

        this.endFill();
    }
}