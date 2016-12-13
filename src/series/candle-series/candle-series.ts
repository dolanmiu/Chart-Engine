import { Series } from "../series";
import { DateRangeTransformer, TimeUnit } from "../../chart/transformers/date-range-transformer";
import { AxisPoint } from "../../chart/axis";
import { GraphicsUtil } from "../../common/graphics-util";

export interface CandleData {
    open: number;
    close: number;
    high: number;
    low: number;
    date?: Date;
}

export class CandleSeries extends Series<Date> {

    private rangeTransformer: DateRangeTransformer;
    private nodes: Array<CandleData>;

    constructor(params: Object = {}) {
        super();
        this.rangeTransformer = new DateRangeTransformer();
        this.nodes = new Array<CandleData>();
    }

    private createCandleCollection(axisPoints: Array<AxisPoint<Date>>, resolution: number): Array<Array<AxisPoint<CandleData>>> {
        let candleDataPairs = new Array<Array<AxisPoint<CandleData>>>();

        axisPoints.forEach(() => {
            candleDataPairs.push(Array<AxisPoint<CandleData>>());
        });

        for (let node of this.nodes) {
            for (let i = 0; i < axisPoints.length - 1; i++) {
                if (axisPoints[i].Value < node.date && node.date <= axisPoints[i + 1].Value) {
                    candleDataPairs[i].push({
                        Value: node,
                        PosRatio: axisPoints[i].PosRatio
                    });
                }
            }
        }

        return candleDataPairs;
    }

    private averageCandle(data: Array<AxisPoint<CandleData>>): AxisPoint<CandleData> {
        let totalOpen = 0;
        let totalClose = 0;
        let totalHigh = 0;
        let totalLow = 0;
        let totalPos = 0;

        for (let datum of data) {
            totalOpen += datum.Value.open;
            totalClose += datum.Value.close;
            totalHigh += datum.Value.high;
            totalLow += datum.Value.low;
            totalPos += datum.PosRatio;
        }

        return {
            Value: {
                open: totalOpen / data.length,
                close: totalClose / data.length,
                high: totalHigh / data.length,
                low: totalLow / data.length
            },
            PosRatio: totalPos / data.length
        };
    }

    private drawBar(bar: AxisPoint<CandleData>) {
        if (isNaN(bar.Value.close) || isNaN(bar.Value.open)) {
            return;
        }

        let height = Math.abs(bar.Value.close - bar.Value.open);
        let xPos = GraphicsUtil.convertToDrawableWidth(bar.PosRatio);

        this.drawRect(xPos, bar.Value.open, 10, height);
        console.log(bar);
    }

    public draw(startDate: Date, endDate: Date) {
        let axisPoints = this.rangeTransformer.transform(startDate, endDate, this.resolution);

        let data = this.createCandleCollection(axisPoints, this.resolution);

        let bars = new Array<AxisPoint<CandleData>>();

        for (let datum of data) {
            bars.push(this.averageCandle(datum));
        }

        this.clear();
        this.lineStyle(1, 0x0000FF, 1);

        for (let bar of bars) {
            this.drawBar(bar);
        }
    }

    get Nodes() {
        return this.nodes;
    }
}
