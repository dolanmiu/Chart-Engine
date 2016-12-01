import * as PIXI from "pixi.js";
import { ISeries } from "../series";
import { Grid } from "./grid";
import { DateRangeTransformer, TimeUnit, FloatTransformer, NumberUnit } from "./transformers";
import { ChartMask } from "./chart-mask";
import { XAxis, YAxis } from "./axis";
import { DateToStringer, DragHandler, StandardToStringer } from "../common";

export class Chart extends PIXI.Container {
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private seriesCollection: Array<ISeries<Date>>;
    private grid: Grid<Date, number>;
    private stageContainer: PIXI.Container;
    private xAxis: XAxis<Date>;
    private yAxis: YAxis<number>;
    private dateRangeTransformer: DateRangeTransformer;
    private floatTransformer: FloatTransformer;

    constructor(private screenWidth: number, private screenHeight: number) {
        super();

        this.seriesCollection = new Array<ISeries<Date>>();
        this.grid = new Grid<Date, number>(100, 100);
        this.renderer = PIXI.autoDetectRenderer(this.screenWidth, this.screenHeight, { backgroundColor: 0x1099bb, antialias: false });
        this.stageContainer = new PIXI.Container();

        this.stageContainer.addChild(this.grid);
        this.addChild(this.stageContainer);

        this.stageContainer.mask = new ChartMask(this.screenWidth, this.screenHeight);
        this.xAxis = new XAxis<Date>(new DateToStringer());
        this.yAxis = new YAxis<number>(new StandardToStringer());
        this.dateRangeTransformer = new DateRangeTransformer();
        this.floatTransformer = new FloatTransformer();

        let endDate = new Date(new Date().getTime() + 10 * 60 * 1000);
        let startDate = new Date();
        this.updatePoints(startDate, endDate, 0, 20);

        this.addChild(this.xAxis);
        this.addChild(this.yAxis);

        let dragHandler = new DragHandler(this.renderer);
        dragHandler.enable((x, y) => {
            let startDate = new Date(this.xAxis.StartValue.getTime() - x * 500);
            let endDate = new Date(this.xAxis.EndValue.getTime() - x * 500);
            let startNumber = this.yAxis.StartValue - y * 0.03;
            let endNumber = this.yAxis.EndValue - y * 0.03;

            this.updatePoints(startDate, endDate, startNumber, endNumber);
        });

        document.addEventListener("mousewheel", event => {
            this.zoom(event.deltaY * 10);
        }, false);
    }

    private updatePoints(startDate: Date, endDate: Date, startNumber: number, endNumber: number) {
        let points = this.dateRangeTransformer.transform(startDate, endDate, TimeUnit.Minute);
        this.xAxis.setPoints(points, startDate, endDate, this.screenWidth);

        let numbers = this.floatTransformer.transform(startNumber, endNumber, NumberUnit.Ones);
        this.yAxis.setPoints(numbers, startNumber, endNumber, this.screenHeight);

        this.grid.setPoints(points, numbers);
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        this.xAxis.draw(this.screenHeight);
        this.yAxis.draw(this.screenWidth);
        this.grid.draw(this.screenWidth, this.screenHeight);
        this.renderer.render(this);
    };

    public addSeries(series: ISeries<Date>) {
        this.seriesCollection.push(series);
    }

    public zoom(zoomAmount: number) {
        let startDate = new Date(this.xAxis.StartValue.getTime() - zoomAmount);
        let endDate = new Date(this.xAxis.EndValue.getTime() + zoomAmount);
        let startNumber = this.yAxis.StartValue;
        let endNumber = this.yAxis.EndValue;
        this.updatePoints(startDate, endDate, startNumber, endNumber);
    }

    get Renderer() {
        return this.renderer;
    }
}
