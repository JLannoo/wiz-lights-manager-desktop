import { WizLight } from "wiz-lights-manager";

export type API = {
    lights: {
        get: {
            all: () => Promise<WizLight[]>
            byIP: (ip: string) => Promise<WizLight | undefined>
        },
        set: {
            all: (state: Partial<WizLight["colorState"]>) => Promise<WizLight["colorState"]>,
            byIP: (state: Partial<WizLight["colorState"]>, ips: string[] | string) => Promise<WizLight["colorState"]>
        }
        refresh: () => Promise<WizLight[]>
    },
    scenes: {
        get: () => Promise<{ [name: string]: number }>
    }
}

declare global {
    interface Window {
        api: API;
    }
}