import { IToStringer } from "./to-stringer";

export class DateToStringer implements IToStringer<Date> {
    stringify(date: Date) {
        let str = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return str;
    }
}
