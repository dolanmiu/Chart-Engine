import { Point } from "./point";

export class XPoint extends Point {

    constructor(wording: string) {
        super(wording);
        //this.text.anchor.x = 0.5;
    }

    public draw(screenHeight: number) {
        this.clear();
        this.lineStyle(1, 0x0000FF, 1);
        this.moveTo(0, 0);
        this.lineTo(0, 100);
        this.endFill();
    }
}
