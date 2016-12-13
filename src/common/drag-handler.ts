import * as PIXI from "pixi.js";

export enum DragType {
    OnlyX, OnlyY, XAndY
}

export class DragHandler {

    private dragging: boolean;
    private dragEvent: any;
    private relativeX: number;
    private relativeY: number;

    constructor(private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {
    }

    public enable(tick: (x: number, y: number) => void): void {
        this.renderer.plugins.interaction
            .on("mousedown", onDragStart)
            .on("touchstart", onDragStart)
            .on("mouseup", onDragEnd)
            .on("mouseupoutside", onDragEnd)
            .on("touchend", onDragEnd)
            .on("touchendoutside", onDragEnd)
            .on("mousemove", onDragMove)
            .on("touchmove", onDragMove);

        let self = this;

        function onDragStart(event: any): void {
            self.dragEvent = event.data;
            self.relativeX = self.dragEvent.originalEvent.clientX;
            self.relativeY = self.dragEvent.originalEvent.clientY;
            self.dragging = true;
        }

        function onDragEnd(): void {
            self.dragging = false;
            self.dragEvent = undefined;
        }

        function onDragMove(event: any): void {
            if (self.dragging) {
                let x = self.dragEvent.originalEvent.clientX - self.relativeX;
                let y = self.dragEvent.originalEvent.clientY - self.relativeY;
                tick(x, y);
                self.relativeX = self.dragEvent.originalEvent.clientX;
                self.relativeY = self.dragEvent.originalEvent.clientY;
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
