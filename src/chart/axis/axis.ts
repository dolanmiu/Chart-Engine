import * as PIXI from "pixi.js";
import { Point } from "./point";
import { AxisPoint } from "./axis-point";
import { IToStringer, StandardToStringer } from "../../common";

export abstract class Axis<T> extends PIXI.Graphics {

    protected toStringer: IToStringer<T>;
    protected startValue: T;
    protected endValue: T;

    constructor(toStringer?: IToStringer<T>) {
        super();
        if (!toStringer) {
            this.toStringer = new StandardToStringer();
        }
        this.toStringer = toStringer;
    }

    get StartValue(): T {
        return this.startValue;
    }

    get EndValue(): T {
        return this.endValue;
    }

    public draw(screenHeight: number) {
        this.clear();

        for (let child of this.children) {
            let point = <Point>child;
            point.draw(screenHeight);
        };
    }

    abstract setPoints(points: Array<AxisPoint<T>>, startValue: T, endValue: T): void;
}
