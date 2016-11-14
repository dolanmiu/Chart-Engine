import * as PIXI from "pixi.js";

export class Chart {
    init() {
        let renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x1099bb });
        document.body.appendChild(renderer.view);

        let stage = new PIXI.Container();
        let texture = PIXI.Texture.fromImage('../src/assets/bunny.png');
        let bunny = new PIXI.Sprite(texture);
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        bunny.position.x = 400;
        bunny.position.y = 300;
        bunny.scale.x = 2;
        bunny.scale.y = 2;
        stage.addChild(bunny);
        animate();

        function animate() {
            requestAnimationFrame(animate);
            let bunny = stage.getChildAt(0);
            bunny.rotation += 0.01;
            renderer.render(stage);
        }
    }
}

