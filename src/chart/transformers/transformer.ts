import { AxisPoint } from "../axis";

export interface ITransformer<T> {
    transform(...args: any[]): Array<AxisPoint<T>>;
}
