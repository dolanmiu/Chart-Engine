import * as PIXI from "pixi.js";
import { ISeries } from "./series";
import { ICoordinate } from "./coordinate";

export class LineSeries<T, V> extends PIXI.Graphics {

    private coordinates: Array<ICoordinate<T, V>>;

    constructor() {
        super();
    }

    public draw(startValue: T, endValue: T) {
        this.clear();

        /*

        this.coordinates.forEach((coordinate, i) => {
            if (i === 0) {
                this.moveTo(coordinate.x, coordinate.y);
            }

            this.lineTo(coordinate.x, coordinate.y);
        });*/
    }

    addCoordinate(coordinate: ICoordinate<T, V>) {
        this.coordinates.push(coordinate);
    }
}
