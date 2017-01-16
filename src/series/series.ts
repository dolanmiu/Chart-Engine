import * as PIXI from "pixi.js";

interface Reso {
    y: number;
    x: number;
}

export interface ISeries<T extends ICountable, V extends ICountable> {
    Resolution: PIXI.Point;
    draw(startX: T, endX: T, startY: V, endY: V): void;
}

export abstract class Series<T extends ICountable, V extends ICountable> extends PIXI.Graphics implements ISeries<T, V> {

    protected resolution: PIXI.Point;
    protected startX: T;
    protected endX: T;
    protected startY: V;
    protected endY: V;
    public rangeX: { start: number, end: number };

    constructor() {
        super();
        this.resolution = new PIXI.Point(1000 * 60, 1);
        this.rangeX = {
            start: 0,
            end: 10,
        };
    }

    private findMidPointOfSubArray(array: Array<T>, startIndex: number, endIndex: number, inputValue: T): T {
        if (array.length === 1) {
            return array[0];
        }

        let midIndex = Math.floor((startIndex + endIndex) / 2);
        let midValue = array[midIndex];
        let result: T;

        if (inputValue > midValue) {
            result = this.findMidPointOfSubArray(array, midIndex, endIndex, inputValue);
        } else {
            result = this.findMidPointOfSubArray(array, startIndex, midIndex, inputValue);
        }
        return result;
    }

    protected findStartCoordinate(array: Array<T>, inputValue: T): T {
        return this.findMidPointOfSubArray(array, 0, array.length - 1, inputValue);
    }

    public draw(startX: T, endX: T, startY: V, endY: V): void {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    };

    set Resolution(value: PIXI.Point) {
        if (!value) {
            return;
        }
        this.resolution = value;
    }

    // abstract get RangeY(): { start: number, end: number };
}
