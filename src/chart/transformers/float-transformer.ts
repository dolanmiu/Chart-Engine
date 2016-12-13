import { AxisPoint } from "../axis";
import { ITransformer } from "./transformer";

export enum NumberUnit {
    Ones = 1, Tens = 10, Hundred = 100, Thousand = 1000
}

export class FloatTransformer implements ITransformer<number> {

    public transform(startNumber: number, endNumber: number, unit: NumberUnit): Array<AxisPoint<number>> {
        let arrayOfAxis = new Array<AxisPoint<number>>();
        let totalRange = endNumber - startNumber;
        let totalUnits = Math.floor(Math.abs(totalRange) / unit);
        let baseNumber = this.createBaseNumber(startNumber, unit);

        // start at one, because it counts the first rounded date as a keypoint, which is obviously in the past
        for (let i = 1; i <= totalUnits; i++) {
            let keyDate = baseNumber + unit * i;
            let relativeDate = keyDate - startNumber;
            let xPos = (relativeDate / totalRange);

            arrayOfAxis.push({
                PosRatio: xPos,
                Value: keyDate
            });
        }

        return arrayOfAxis;
    }

    // This only rounds off the date to prepare for addition
    private createBaseNumber(startDate: number, unit: NumberUnit): number {
        let baseNumber: number;

        switch (unit) {
            case NumberUnit.Ones:
                baseNumber = Math.ceil(startDate);
                break;
            case NumberUnit.Tens:
                baseNumber = Math.ceil(startDate / 10) * 10;
                break;
            case NumberUnit.Hundred:
                baseNumber = Math.ceil(startDate / 100) * 100;
                break;
            case NumberUnit.Thousand:
                baseNumber = Math.ceil(startDate / 1000) * 1000;
                break;
            default:
                console.error("Invalid time");
        }

        return baseNumber;
    }
}
