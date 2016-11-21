import * as PIXI from "pixi.js";
import { Series } from "../series";
import { Grid, DateRangeTransformer, TimeUnit } from "./grid";
import { ChartMask } from "./chart-mask";
import { StageContainer } from "./stage";
import { XAxis } from "./axis";
import { DateToStringer } from "../common";
export class Chart {
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private rootContainer: PIXI.Container;
    private seriesCollection: Array<Series>;
    private grid: Grid;
    private stageContainer: PIXI.Container;
    private hudContainer: PIXI.Container;
    private xAxis: XAxis<Date>;
    private dateRangeTransformer: DateRangeTransformer;

    constructor(private screenWidth: number, private screenHeight: number) {
        this.seriesCollection = new Array<Series>();
        this.grid = new Grid(100, 100);
        this.renderer = PIXI.autoDetectRenderer(this.screenWidth, this.screenHeight, { backgroundColor: 0x1099bb, antialias: false });
        this.rootContainer = new PIXI.Container();
        this.stageContainer = new StageContainer(this.renderer);

        this.hudContainer = new PIXI.Container();
        this.stageContainer.addChild(this.grid);
        this.rootContainer.addChild(this.stageContainer);

        this.stageContainer.mask = new ChartMask(this.screenWidth, this.screenHeight);
        this.xAxis = new XAxis<Date>(new DateToStringer());
        this.dateRangeTransformer = new DateRangeTransformer();

        let endDate = new Date(new Date().getTime() + 10 * 60 * 1000);
        let points = this.dateRangeTransformer.transform(new Date(), endDate, this.screenWidth, TimeUnit.Minute);
        this.xAxis.Points = points;
        // this.grid.xPoints = 
        this.rootContainer.addChild(this.xAxis);
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
        let bunny = this.rootContainer.getChildAt(2);
        bunny.rotation += 0.01;
        this.xAxis.draw(this.screenHeight);
        this.renderer.render(this.rootContainer);
    };

    public addSeries(series: Series) {
        this.seriesCollection.push(series);
    }

}
