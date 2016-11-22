import * as PIXI from "pixi.js";

export class Point extends PIXI.Graphics {

    private text: PIXI.Text;

    constructor(wording: string) {
        super();
        this.text = new PIXI.Text(wording, {
            fill: "white",
            fontSize: 8,
        });
        this.text.anchor.x = 0.5;
        this.addChild(this.text);
    }

    public draw(screenHeight: number) {
        this.clear();
        this.lineStyle(1, 0x0000FF, 1);
        this.moveTo(0, 0);
        this.lineTo(0, 100);
        this.endFill();
    }
}
