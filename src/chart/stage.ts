import * as PIXI from "pixi.js";

export class StageContainer extends PIXI.Container {

    private dragging: boolean;
    private dragEvent: any;
    private relativeX: number;
    private relativeY: number;

    constructor(renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {
        super();

        renderer.plugins.interaction
            .on("mousedown", onDragStart)
            .on("touchstart", onDragStart)
            .on("mouseup", onDragEnd)
            .on("mouseupoutside", onDragEnd)
            .on("touchend", onDragEnd)
            .on("touchendoutside", onDragEnd)
            .on("mousemove", onDragMove)
            .on("touchmove", onDragMove);

        let self = this;

        function onDragStart(event: any) {
            self.dragEvent = event.data;
            self.relativeX = self.dragEvent.originalEvent.clientX - self.position.x;
            self.relativeY = self.dragEvent.originalEvent.clientY - self.position.y;
            self.dragging = true;
        }

        function onDragEnd() {
            self.dragging = false;
            self.dragEvent = null;
        }

        function onDragMove() {
            if (self.dragging) {
                console.log(self.dragEvent);

                // let newPosition = this.dragEvent.getLocalPosition(this.parent);
                self.position.x = self.dragEvent.originalEvent.clientX - self.relativeX;
                self.position.y = self.dragEvent.originalEvent.clientY - self.relativeY;
            }
        }
    }

    /*private onDragStart(event: any) {
        console.log("dragging");
        this.dragEvent = event;
        this.dragging = true;

    }

    private onDragEnd() {
        console.log("finished dragging");
        this.dragging = false;

    }

    private onDragMove() {
        if (this.dragging) {
            console.log(this.dragEvent);
            // let newPosition = this.dragEvent.getLocalPosition(this.parent);
            this.position.x = this.dragEvent.data.originalEvent.clientX;
            this.position.y = this.dragEvent.data.originalEvent.clientY;
        }
    }*/
}
