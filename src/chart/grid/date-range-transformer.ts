import { AxisPoint } from "../axis/axis-point";

export enum TimeUnit {
    Second = 1000, Minute = 1000 * 60, Hour = 1000 * 60 * 60,
}

export class DateRangeTransformer {

    public transform(startDate: Date, endDate: Date, width: number, timeUnit: TimeUnit) {
        let arrayOfAxis = new Array<AxisPoint<Date>>();
        let totalMillisecondsInRange = endDate.getTime() - startDate.getTime();
        let totalUnits = Math.floor(Math.abs(totalMillisecondsInRange) / timeUnit);
        let baseDate = this.createBaseDate(startDate, timeUnit);

        // start at one, because it counts the first rounded date as a keypoint, which is obviously in the past
        for (let i = 1; i <= totalUnits; i++) {
            let keyDate = new Date(baseDate.getTime() + timeUnit * i);
            let relativeDate = keyDate.getTime() - startDate.getTime();
            let xPos = (relativeDate / totalMillisecondsInRange) * width;

            arrayOfAxis.push(new AxisPoint(keyDate, xPos));
        }

        return arrayOfAxis;
    }

    // This only rounds off the date to prepare for addition
    private createBaseDate(startDate: Date, timeUnit: TimeUnit) {
        let baseDate: Date;

        switch (timeUnit) {
            case TimeUnit.Second:
                baseDate = new Date(startDate);
                baseDate.setMilliseconds(0);
                break;
            case TimeUnit.Minute:
                baseDate = new Date(startDate);
                baseDate.setSeconds(0, 0);
                break;
            case TimeUnit.Hour:
                baseDate = new Date(startDate);
                baseDate.setMinutes(0, 0, 0);
                break;
            default:
                console.error("Invalid time");
        }

        return baseDate;
    }

}
