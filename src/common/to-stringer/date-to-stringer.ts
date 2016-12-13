import { IToStringer } from "./to-stringer";

export class DateToStringer implements IToStringer<Date> {
    public stringify(date: Date): string {
        let hours = this.pad(date.getHours(), 2);
        let minutes = this.pad(date.getMinutes(), 2);
        let seconds = this.pad(date.getSeconds(), 2);
        let str = `${hours}:${minutes}:${seconds}`;

        return str;
    }

    private pad(num: number, size: number): string {
        let str = "00" + num;

        return str.substr(str.length - size);
    }
}
