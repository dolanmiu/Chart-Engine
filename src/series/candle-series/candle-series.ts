import { Series } from "../series";
import { DateRangeTransformer } from "../../chart/transformers/date-range-transformer";

export interface CandleData {
    open: number;
    close: number;
    high: number;
    low: number;
}

export class CandleSeries extends Series<Date> {

    private rangeTransformer: DateRangeTransformer;

    constructor(params: Object) {
        super();
        this.rangeTransformer = new DateRangeTransformer();
    }

    private calculateStartDate() {

    }

    public draw(startDate: Date, endDate: Date) {
        this.rangeTransformer.transform(startDate, endDate, this.resolution);
    }
}
