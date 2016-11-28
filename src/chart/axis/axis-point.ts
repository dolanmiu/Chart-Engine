export class AxisPoint<T> {
    private pos: number;

    constructor(private value: T, pos: number) {
        this.pos = pos;
    }

    get PosRatio() {
        return this.pos;
    }

    get Value() {
        return this.value;
    }
}
