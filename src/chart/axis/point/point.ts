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

    public abstract draw(): void;

    public destroy(): void {
        super.destroy();
        this.text.destroy();
        this.removeChildren();
    }
}
