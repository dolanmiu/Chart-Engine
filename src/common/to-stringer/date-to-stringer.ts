import { IToStringer } from "./to-stringer";

export class DateToStringer implements IToStringer<Date> {
    stringify(date: Date) {
        let str = date.toString();
        return str;
    }
}
