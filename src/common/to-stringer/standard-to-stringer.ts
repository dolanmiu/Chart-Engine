import { IToStringer } from "./to-stringer";

export class StandardToStringer implements IToStringer<any> {
    public stringify(obj: any): string {
        return obj.toString();
    }
}
