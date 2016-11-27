import { Point } from "./point";

export class YPoint extends Point {

    constructor(wording: string) {
        super(wording);
        //this.text.anchor.y = 0.5;
    }

    public draw(screenHeight: number) {
        this.clear();
        this.lineStyle(1, 0x0000FF, 1);
        this.moveTo(0, 0);
        this.lineTo(100, 0);
        this.endFill();
    }
}
