import { WizLight } from "wiz-lights-manager";

export function getColorType(state: WizLight["colorState"]): "rgb" | "temp" | "scene" {
    if("r" in state) return "rgb";
    if("temp" in state) return "temp";
    if("sceneId" in state) return "scene";
    throw new Error("Unknown color type");
}