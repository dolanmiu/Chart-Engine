import * as PIXI from "pixi.js";

export interface ISeries<T extends ICountable> {
    Resolution: number;
    draw(startValue: T, endValue: T): void;
}

export interface ICountable {
    valueOf(): number;
}

export abstract class Series<T extends ICountable> extends PIXI.Graphics implements ISeries<T> {

    protected resolution: number;

    constructor() {
        super();
        this.resolution = 1000 * 60;
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

    public abstract draw(startValue: T, endValue: T): void;

    set Resolution(value: number) {
        if (!value) {
            return;
        }
        this.resolution = value;
    }
}
