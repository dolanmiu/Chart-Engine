import * as PIXI from "pixi.js";
import { ICoordinate } from "./coordinate";

export class LineSeries<T, V> extends PIXI.Graphics {

    private coordinates: Array<ICoordinate<T, V>>;

    constructor() {
        super();
    }

    public draw(startValue: T, endValue: T): void {
        this.clear();

        /*

        this.coordinates.forEach((coordinate, i) => {
            if (i === 0) {
                this.moveTo(coordinate.x, coordinate.y);
            }

            this.lineTo(coordinate.x, coordinate.y);
        });*/
    }

    public addCoordinate(coordinate: ICoordinate<T, V>): void {
        this.coordinates.push(coordinate);
    }
}
