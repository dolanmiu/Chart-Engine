export class GraphicsUtil {

    public static convertToDrawable(value: number) {
        let ceiled = Math.ceil(value);
        let rounded = Math.round(value);

        if (value === rounded) {
            // An integer
            return rounded + 0.5;
        } else if (ceiled - value < 0.5) {
            // Is rounded up
            return rounded - 0.5;
        } else if (ceiled - value > 0.5) {
            // Is rounded down
            return rounded + 0.5;
        } else if (ceiled - value === 0.5) {
            // Bang on center
            return value;
        }
    }
}