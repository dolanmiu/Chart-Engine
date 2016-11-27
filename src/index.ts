import { Chart } from "./chart";

let chart = new Chart(800, 600);
document.body.appendChild(chart.Renderer.view);
document.addEventListener("mousewheel", event => {
    chart.zoom(event.deltaY * 10);
}, false);
chart.animate();
