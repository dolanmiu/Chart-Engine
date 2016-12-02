import { Series } from "../series";
import { DateRangeTransformer } from "../../chart/transformers/date-range-transformer";

export interface CandleData {
    open: number;
    close: number;
    high: number;
    low: number;
    date: Date;
}

interface CandleDataDatePair {
    data: Array<CandleData>
    date: Date
}

export class CandleSeries extends Series<Date> {

    private rangeTransformer: DateRangeTransformer;
    private nodes: Array<CandleData>;

    constructor(params: Object) {
        super();
        this.rangeTransformer = new DateRangeTransformer();
        this.nodes = new Array<CandleData>();
    }

    private sliceStartEndData(startDate: Date, endDate: Date) {
        return new Array<CandleDataDatePair>();
    }

    private averageCandle(data: CandleDataDatePair) {
        let totalOpen = 0;
        let totalClose = 0;
        let totalHigh = 0;
        let totalLow = 0;

        for (let datum of data.data) {
            totalOpen += datum.open;
            totalClose += datum.close;
            totalHigh += datum.high;
            totalLow += datum.low;
        }

        return {
            open: totalOpen / data.data.length,
            close: totalClose / data.data.length,
            high: totalHigh / data.data.length,
            low: totalLow / data.data.length,
            date: data.date,
        };
    }

    private drawBar(bar: CandleData) {

    }

    public draw(startDate: Date, endDate: Date) {
        let axisPoints = this.rangeTransformer.transform(startDate, endDate, this.resolution);
        let data = this.sliceStartEndData(axisPoints[0].Value, axisPoints[axisPoints.length - 1].Value);

        let bars = new Array<CandleData>();

        for (let datum of data) {
            bars.push(this.averageCandle(datum));
        }

        this.clear();

        for (let bar of bars) {
            this.drawBar(bar);
        }
    }
}
