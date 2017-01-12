import * as PIXI from "pixi.js";
import { Chart } from "./chart";
import { CandleSeries, CandleData } from "./series/candle-series/candle-series";

PIXI.Transform.prototype.position = function (): PIXI.Point {
    console.log("injection hack");
    return new PIXI.Point(100, 100);
} ();

// PIXI.DisplayObject.prototype.transform.prototype.position = new PIXI.Point(100, 100);

let chart = new Chart(800, 600);
document.body.appendChild(chart.Renderer.view);
let series: CandleSeries;

$.getJSON("../example/sample-data/eurusd.json", (response: Array<CandleData>) => {
    console.log(response);
    series = new CandleSeries(response);
    chart.addSeries(series);
    chart.animate();
});
/*series.Nodes.push({
    open: 3,
    close: 7,
    low: 3.5,
    high: 9.5,
    date: new Date()
});*/
