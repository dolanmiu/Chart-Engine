import { AxisPoint } from "../axis";

export interface ITransformer<T> {
    transform(startDate: T, endDate: T, unit: any): Array<AxisPoint<T>>;
}
