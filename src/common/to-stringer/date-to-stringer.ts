import { IToStringer } from "./to-stringer";

export class DateToStringer implements IToStringer<Date> {
    stringify(date: Date) {
        let hours = this.pad(date.getHours(), 2);
        let minutes = this.pad(date.getMinutes(), 2);
        let seconds = this.pad(date.getSeconds(), 2);
        let str = `${hours}:${minutes}:${seconds}`;

        return str;
    }

    private pad(num: number, size: number) {
        let str = "00" + num;

        return str.substr(str.length - size);
    }
}
