import * as PIXI from "pixi.js";
import { Chart } from "./chart";
import { CandleSeries } from "./series/candle-series/candle-series";

PIXI.Transform.prototype.position = function () {
    console.log("injection hack");
    return new PIXI.Point(100, 100);
}();

// PIXI.DisplayObject.prototype.transform.prototype.position = new PIXI.Point(100, 100);

let chart = new Chart(800, 600);
document.body.appendChild(chart.Renderer.view);
let series = new CandleSeries();
//series.add
chart.addSeries(series);
chart.animate();
