import { WizLight } from "wiz-lights-manager";

const DEFAULT_COMMON_STATE = {
    state: true,
    dimming: 100,
};

export const DEFAULT_RGB_STATE: WizLight["colorState"] = {
    ...DEFAULT_COMMON_STATE,
    r: 255,
    g: 255,
    b: 255,
};

export const DEFAULT_TEMP_STATE: WizLight["colorState"] = {
    ...DEFAULT_COMMON_STATE,
    temp: 6500,
};

export const DEFAULT_CW_STATE: WizLight["colorState"] = {
    ...DEFAULT_COMMON_STATE,
    c: 255,
    w: 255,
};

export const DEFAULT_SCENE_STATE: WizLight["colorState"] = {
    ...DEFAULT_COMMON_STATE,
    sceneId: 1,
    speed: 50,
};

