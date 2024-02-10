/**
 * Converts Kelvin color to RGB
 * @external https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
 */
export function KelvinToRGB(temp: number): [number, number, number] {
    let red: number;
    let green: number;
    let blue: number;

    if (temp <= 66) {
        red = 255;
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
    }

    if (temp <= 66) {
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
    } else {
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);
    }

    if (temp >= 66) {
        blue = 255;
    } else {
        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    }

    return [red, green, blue];
}

/**
 * Converts Cool/Warm (0-255) white to Kelvin
 */
export function CWToKelvin(c: number, w: number): number {
    return Math.round(1000000 / (c * (1000000 / (c + w))));
}

/**
 * Converts Cool/Warm (0-255) white to RGB
 */
export function CWToRGB(c: number, w: number): [number, number, number] {
    return KelvinToRGB(CWToKelvin(c, w));
}

/**
 * Converts RGB to Hex
 */
export function RGBToHex(r: number, g: number, b: number): string {
    return `#${Math.round(r).toString(16).padStart(2, "0")}${Math.round(g).toString(16).padStart(2, "0")}${Math.round(b).toString(16).padStart(2, "0")}`;
}