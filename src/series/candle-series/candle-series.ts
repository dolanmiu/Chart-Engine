import { Series } from "../series";
import { DateRangeTransformer } from "../../chart/transformers/date-range-transformer";
import { AxisPoint } from "../../chart/axis";
import { GraphicsUtil } from "../../common/graphics-util";

export interface CandleData {
    open: number;
    close: number;
    high: number;
    low: number;
    date: Date;
}

export class CandleSeries extends Series<Date, number> {

    private dateRangeTransformer: DateRangeTransformer;
    private nodes: Array<CandleData>;

    constructor(data: Array<CandleData> = []) {
        super();

        this.dateRangeTransformer = new DateRangeTransformer();
        this.nodes = new Array<CandleData>();

        // Delete these date hacks
        let currentDate = new Date();
        for (let datum of data) {
            datum.date = new Date(currentDate.getTime() - 1 * 100);
            datum.close *= 10;
            currentDate = datum.date;
            this.Nodes.push(datum);
        }
    }

    private createCandleCollection(axisPoints: Array<AxisPoint<Date>>): Array<Array<AxisPoint<CandleData>>> {
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
        let totalDate = 0;

        for (let datum of data) {
            totalOpen += datum.Value.open;
            totalClose += datum.Value.close;
            totalHigh += datum.Value.high;
            totalLow += datum.Value.low;
            totalPos += datum.PosRatio;
            totalDate += datum.Value.date.getTime();
        }

        return {
            Value: {
                open: totalOpen / data.length,
                close: totalClose / data.length,
                high: totalHigh / data.length,
                low: totalLow / data.length,
                date: new Date(totalDate / data.length)
            },
            PosRatio: totalPos / data.length
        };
    }

    private drawBar(bar: AxisPoint<CandleData>, startValue: number, endValue: number): void {
        if (isNaN(bar.Value.close) || isNaN(bar.Value.open)) {
            return;
        }
        this.lineStyle(1, 0x000000, 1);
        this.beginFill(0xFFFF00);

        let height = Math.abs(bar.Value.close - bar.Value.open);
        let yPosOpen = GraphicsUtil.convertToDrawableHeightFromRange(startValue, endValue, bar.Value.open);
        let yPosClose = GraphicsUtil.convertToDrawableHeightFromRange(startValue, endValue, bar.Value.close);
        let yPosHigh = GraphicsUtil.convertToDrawableHeightFromRange(startValue, endValue, bar.Value.high);
        let yPosLow = GraphicsUtil.convertToDrawableHeightFromRange(startValue, endValue, bar.Value.low);

        let xPos = GraphicsUtil.convertToDrawableWidth(bar.PosRatio);
        let candleWidth = 10;

        // Draw body of candle
        this.drawRect(xPos - candleWidth / 2, yPosOpen, candleWidth, height);

        // Draw the wick ends
        this.moveTo(xPos - candleWidth / 2, yPosHigh);
        this.lineTo(xPos + candleWidth, yPosHigh);
        this.moveTo(xPos - candleWidth / 2, yPosLow);
        this.lineTo(xPos + candleWidth, yPosLow);

        // Draw the wicks
        this.moveTo(xPos, yPosOpen);
        this.lineTo(xPos, yPosHigh);
        this.moveTo(xPos, yPosClose);
        this.lineTo(xPos, yPosLow);
        // console.log(bar);
    }

    public draw(startDate: Date, endDate: Date, startValue: number, endValue: number): void {
        super.draw(startDate, endDate, startValue, endValue);
        let axisPoints = this.dateRangeTransformer.transform(startDate, endDate, this.resolution.x);

        let data = this.createCandleCollection(axisPoints);

        let bars = new Array<AxisPoint<CandleData>>();

        for (let datum of data) {
            bars.push(this.averageCandle(datum));
        }

        this.rangeX = this.calculateRangeY(bars);
        console.log(this.rangeX);

        this.clear();
        this.lineStyle(1, 0x0000FF, 1);

        for (let bar of bars) {
            this.drawBar(bar, startValue, endValue);
        }
    }

    get Nodes(): Array<CandleData> {
        return this.nodes;
    }

    private calculateRangeY(candleData: Array<AxisPoint<CandleData>>): { start: number, end: number } {
        let start: number = Number.MAX_VALUE;
        let end: number = Number.MAX_VALUE;

        for (let candle of candleData) {
            if (candle.Value.low < start) {
                start = candle.Value.low;
            }

            if (candle.Value.high < end) {
                end = candle.Value.high;
            }
        }

        return {
            start, end
        };
    }
}
