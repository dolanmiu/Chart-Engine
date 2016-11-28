export interface ISeries<T> {
    draw(startValue: T, endValue: T): void;
}
