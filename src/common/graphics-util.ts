export class GraphicsUtil {

    private static screenWidth: number = 1;
    private static screenHeight: number = 1;

    static get ScreenWidth(): number {
        return this.screenWidth;
    }

    static set ScreenWidth(value: number) {
        if (0 > value) {
            console.error("Setting height to negative value");
            return;
        }

        this.screenWidth = value;
    }

    static get ScreenHeight(): number {
        return this.screenHeight;
    }

    static set ScreenHeight(value: number) {
        if (0 > value) {
            console.error("Setting height to negative value");
            return;
        }

        this.screenHeight = value;
    }

    public static convertToDrawableWidth(ratio: number): number {
        return this.convertToDrawable(ratio, this.ScreenWidth);
    }

    public static convertToDrawableHeight(ratio: number): number {
        return this.convertToDrawable(ratio, this.ScreenWidth);
    }

    private static convertToDrawable(ratio: number, dimension: number): number {
        let value = ratio * dimension;
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
