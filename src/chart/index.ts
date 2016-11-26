import * as PIXI from "pixi.js";
import { Series } from "../series";
import { Grid, DateRangeTransformer, TimeUnit } from "./grid";
import { ChartMask } from "./chart-mask";
import { XAxis, YAxis } from "./axis";
import { DateToStringer, DragHandler } from "../common";

export class Chart {
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private rootContainer: PIXI.Container;
    private seriesCollection: Array<Series>;
    private grid: Grid<Date, number>;
    private stageContainer: PIXI.Container;
    private hudContainer: PIXI.Container;
    private xAxis: XAxis<Date>;
    private yAxis: YAxis<Date>;
    private dateRangeTransformer: DateRangeTransformer;

    constructor(private screenWidth: number, private screenHeight: number) {
        this.seriesCollection = new Array<Series>();
        this.grid = new Grid<Date, number>(100, 100);
        this.renderer = PIXI.autoDetectRenderer(this.screenWidth, this.screenHeight, { backgroundColor: 0x1099bb, antialias: false });
        this.rootContainer = new PIXI.Container();
        this.stageContainer = new PIXI.Container();

        this.hudContainer = new PIXI.Container();
        this.stageContainer.addChild(this.grid);
        this.rootContainer.addChild(this.stageContainer);

        this.stageContainer.mask = new ChartMask(this.screenWidth, this.screenHeight);
        let dragHandler = new DragHandler(this.renderer);
        this.xAxis = new XAxis<Date>(new DateToStringer());
        this.yAxis = new YAxis<Date>(new DateToStringer());
        this.dateRangeTransformer = new DateRangeTransformer();

        let endDate = new Date(new Date().getTime() + 10 * 60 * 1000);
        let startDate = new Date();
        let points = this.dateRangeTransformer.transform(startDate, endDate, this.screenWidth, TimeUnit.Minute);
        this.xAxis.setPoints(points, startDate, endDate);
        this.yAxis.setPoints(points, startDate, endDate);
        this.grid.xPoints = points;
        this.rootContainer.addChild(this.xAxis);
        this.rootContainer.addChild(this.yAxis);
        dragHandler.enable((x, y) => {
            let startDate = new Date(this.xAxis.StartValue.getTime() - x * 500);
            let endDate = new Date(this.xAxis.EndValue.getTime() - x * 500);
            // console.log(startDate);
            let points = this.dateRangeTransformer.transform(startDate, endDate, this.screenWidth, TimeUnit.Minute);
            this.xAxis.setPoints(points, startDate, endDate);

            let numbers = this.dateRangeTransformer.transform(startDate, endDate, this.screenHeight, TimeUnit.Minute);
            this.yAxis.setPoints(numbers, startDate, endDate);

        });
    }

    init() {
        document.body.appendChild(this.renderer.view);

        let texture = PIXI.Texture.fromImage("../src/assets/bunny.png");
        let bunny = new PIXI.Sprite(texture);
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        bunny.position.x = 400;
        bunny.position.y = 300;
        bunny.scale.x = 2;
        bunny.scale.y = 2;
        this.rootContainer.addChild(bunny);
        this.grid.draw(this.screenWidth, this.screenHeight);
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        let bunny = this.rootContainer.getChildAt(3);
        bunny.rotation += 0.01;
        this.xAxis.draw(this.screenHeight);
        this.yAxis.draw(this.screenWidth);
        this.renderer.render(this.rootContainer);
    };

    public addSeries(series: Series) {
        this.seriesCollection.push(series);
    }

}
