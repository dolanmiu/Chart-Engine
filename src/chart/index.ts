import * as PIXI from "pixi.js";
import { Series } from "../series";
import { Grid } from "./grid";

export class Chart {
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private stage: PIXI.Container;
    private seriesCollection: Array<Series>;
    private grid: Grid;

    constructor(private screenWidth: number, private screenHeight: number) {
        this.seriesCollection = new Array<Series>();
        this.grid = new Grid(100, 100);
        this.renderer = PIXI.autoDetectRenderer(this.screenWidth, this.screenHeight, { backgroundColor: 0x1099bb, antialias: false });
        this.stage = new PIXI.Container();
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
        this.stage.addChild(bunny);
        this.stage.addChild(this.grid);
        this.grid.draw(this.screenWidth, this.screenHeight);
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        let bunny = this.stage.getChildAt(0);
        bunny.rotation += 0.01;
        this.renderer.render(this.stage);
    };

    public addSeries(series: Series) {
        this.seriesCollection.push(series);
    }

}
