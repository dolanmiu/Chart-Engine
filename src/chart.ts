import * as PIXI from "pixi.js";
import { Series } from "./series";

export class Chart {
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private stage: PIXI.Container;
    private seriesCollection: Array<Series>;

    constructor() {
        this.seriesCollection = new Array<Series>();
    }

    init() {
        this.renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
        document.body.appendChild(this.renderer.view);

        this.stage = new PIXI.Container();
        let texture = PIXI.Texture.fromImage("../src/assets/bunny.png");
        let bunny = new PIXI.Sprite(texture);
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        bunny.position.x = 400;
        bunny.position.y = 300;
        bunny.scale.x = 2;
        bunny.scale.y = 2;
        this.stage.addChild(bunny);
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
