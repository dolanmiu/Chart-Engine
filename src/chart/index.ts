import * as PIXI from "pixi.js";
import { Series } from "../series";
import { Grid } from "./grid";
import { DateRangeTransformer, TimeUnit, FloatTransformer, NumberUnit } from "./transformers";
import { ChartMask } from "./chart-mask";
import { XAxis, YAxis } from "./axis";
import { DateToStringer, DragHandler, StandardToStringer } from "../common";

export class Chart extends PIXI.Container {
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private seriesCollection: Array<Series>;
    private grid: Grid<Date, number>;
    private stageContainer: PIXI.Container;
    private hudContainer: PIXI.Container;
    private xAxis: XAxis<Date>;
    private yAxis: YAxis<number>;
    private dateRangeTransformer: DateRangeTransformer;
    private floatTransformer: FloatTransformer;

    constructor(private screenWidth: number, private screenHeight: number) {
        super();

        this.seriesCollection = new Array<Series>();
        this.grid = new Grid<Date, number>(100, 100);
        this.renderer = PIXI.autoDetectRenderer(this.screenWidth, this.screenHeight, { backgroundColor: 0x1099bb, antialias: false });
        this.stageContainer = new PIXI.Container();

        this.hudContainer = new PIXI.Container();
        this.stageContainer.addChild(this.grid);
        this.addChild(this.stageContainer);

        this.stageContainer.mask = new ChartMask(this.screenWidth, this.screenHeight);
        let dragHandler = new DragHandler(this.renderer);
        this.xAxis = new XAxis<Date>(new DateToStringer());
        this.yAxis = new YAxis<number>(new StandardToStringer());
        this.dateRangeTransformer = new DateRangeTransformer();
        this.floatTransformer = new FloatTransformer();

        let endDate = new Date(new Date().getTime() + 10 * 60 * 1000);
        let startDate = new Date();
        let points = this.dateRangeTransformer.transform(startDate, endDate, this.screenWidth, TimeUnit.Minute);
        let floats = this.floatTransformer.transform(0, 20, this.screenWidth, NumberUnit.Ones);
        console.log(floats);
        this.xAxis.setPoints(points, startDate, endDate);
        this.yAxis.setPoints(floats, 0, 20);
        this.grid.xPoints = points;

        this.addChild(this.xAxis);
        this.addChild(this.yAxis);
        dragHandler.enable((x, y) => {
            let startDate = new Date(this.xAxis.StartValue.getTime() - x * 500);
            let endDate = new Date(this.xAxis.EndValue.getTime() - x * 500);

            let points = this.dateRangeTransformer.transform(startDate, endDate, this.screenWidth, TimeUnit.Minute);
            this.xAxis.setPoints(points, startDate, endDate);

            let startNumber = this.yAxis.StartValue - y * 0.03;
            let endNumber = this.yAxis.EndValue - y * 0.03;

            let numbers = this.floatTransformer.transform(startNumber, endNumber, this.screenHeight, NumberUnit.Ones);
            this.yAxis.setPoints(numbers, startNumber, endNumber);
        });
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        this.xAxis.draw(this.screenHeight);
        this.yAxis.draw(this.screenWidth);
        this.renderer.render(this);
        this.grid.draw(this.screenWidth, this.screenHeight);
    };

    public addSeries(series: Series) {
        this.seriesCollection.push(series);
    }

    get Renderer() {
        return this.renderer;
    }

}
