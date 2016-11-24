import * as PIXI from "pixi.js";

export abstract class Point extends PIXI.Graphics {

    protected text: PIXI.Text;

    constructor(wording: string) {
        super();
        this.text = new PIXI.Text(wording, {
            fill: "white",
            fontSize: 8,
        });
        this.addChild(this.text);
    }

    abstract draw(changeMe: number): void;
}
