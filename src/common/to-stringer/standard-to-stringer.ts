import { IToStringer } from "./to-stringer";

export class StandardToStringer implements IToStringer<any> {
    stringify(obj: any) {
        return obj.toString();
    }
}
