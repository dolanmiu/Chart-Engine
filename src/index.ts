import * as PIXI from "pixi.js";
import { Chart } from "./chart";

PIXI.Transform.prototype.position = function () {
    console.log("injection hack");
    return new PIXI.Point(100, 100);
}();

// PIXI.DisplayObject.prototype.transform.prototype.position = new PIXI.Point(100, 100);

let chart = new Chart(800, 600);
document.body.appendChild(chart.Renderer.view);
chart.animate();
