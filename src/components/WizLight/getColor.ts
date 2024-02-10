import { CWToRGB, KelvinToRGB } from "../../utils/color";
import { WizLight } from "wiz-lights-manager";

export function getColor(colorState: WizLight["colorState"]) {
    let color: {r: number, g: number, b: number, a: number};
    if ("temp" in colorState) {
        const [r, g, b] = KelvinToRGB(colorState.temp);
        color = {r, g, b, a: 1}

    } else if ("r" in colorState) {
        color = {r: colorState.r, g: colorState.g, b: colorState.b, a: 1}

    } else if ("c" in colorState && "w" in colorState) {
        const [r,g,b] = CWToRGB(colorState.c, colorState.w);
        color = {r, g, b, a: 1}

    } else {
        color = {r: 0, g: 0, b: 0, a: 1}
    }

    const mappedDimming = Math.round(colorState.dimming / 100 * 255);
    color = {
        r: Math.round(color.r * mappedDimming / 255),
        g: Math.round(color.g * mappedDimming / 255),
        b: Math.round(color.b * mappedDimming / 255),
        a: color.a,
    }

    if (!colorState.state) {
        color = {...color, a: 0.5 };
    }

    return color;
}