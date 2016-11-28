import { Chart } from "./chart";

let chart = new Chart(800, 600);
document.body.appendChild(chart.Renderer.view);
chart.animate();
