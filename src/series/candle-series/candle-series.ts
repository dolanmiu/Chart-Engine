import { Series } from "../series";
import { DateRangeTransformer, TimeUnit } from "../../chart/transformers/date-range-transformer";
import { AxisPoint } from "../../chart/axis";

export interface CandleData {
    open: number;
    close: number;
    high: number;
    low: number;
    date: Date;
}

interface CandleDataDatePair {
    data: Array<CandleData>;
    date: Date;
}

export class CandleSeries extends Series<Date> {

    private rangeTransformer: DateRangeTransformer;
    private nodes: Array<CandleData>;

    constructor(params: Object = {}) {
        super();
        this.rangeTransformer = new DateRangeTransformer();
        this.nodes = new Array<CandleData>();
    }

    private createCandlePairs(axisPoints: Array<AxisPoint<Date>>, resolution: number) {
        let candleDataPairs = new Array<CandleDataDatePair>();
        for (let axisPoint of axisPoints) {
            
        }

        candleDataPairs.push({
            data: [{
                open: 1,
                close: 2,
                high: 5,
                low: 0,
                date: new Date()
            }],
            date: new Date()
        });
        return candleDataPairs;
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
        this.drawCircle(100, 100, 10);
        console.log(bar);
    }

    public draw(startDate: Date, endDate: Date) {
        let axisPoints = this.rangeTransformer.transform(startDate, endDate, this.resolution);

        let data = this.createCandlePairs(axisPoints, this.resolution);

        let bars = new Array<CandleData>();

        for (let datum of data) {
            bars.push(this.averageCandle(datum));
        }

        this.clear();
        this.lineStyle(1, 0x0000FF, 1);

        for (let bar of bars) {
            this.drawBar(bar);
        }
    }
}
