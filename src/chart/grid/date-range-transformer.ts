export enum TimeUnit {
    Second = 1000, Minute = 1000 * 60, Hour = 1000 * 60 * 60,
}

export interface DateAxis {
    x: number;
    date: Date;
}

export class DateRangeTransformer {

    public transform(startDate: Date, endDate: Date, timeUnit: TimeUnit) {
        let arrayOfAxis = new Array<DateAxis>();
        let totalUnits = Math.abs(startDate.getTime() - endDate.getTime()) / timeUnit;
        let baseDate = this.createBaseDate(startDate, timeUnit);

        for (let i = 0; i < totalUnits; i++) {
            arrayOfAxis.push({
                date: new Date(baseDate.getTime() + timeUnit * i),
                x: i
            });
        }

        return arrayOfAxis;
    }

    private createBaseDate(startDate: Date, timeUnit: TimeUnit) {
        let baseDate: Date;

        switch (timeUnit) {
            case TimeUnit.Second:
                baseDate = new Date(startDate);
                baseDate.setSeconds(0, 0);
                break;
            case TimeUnit.Minute:
                baseDate = new Date(startDate);
                baseDate.setSeconds(0, 0, );
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