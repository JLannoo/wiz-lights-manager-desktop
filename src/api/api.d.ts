import { WizLight } from "wiz-lights-manager";
import { GroupsStore, PinnedStore } from "./storage/store";

export type API = {
    lights: {
        get: {
            all: () => Promise<WizLight[]>
            byIP: (ip: string) => Promise<WizLight | undefined>
            aliases: () => Promise<{ mac: string; alias: string }[]>
            pinned: () => Promise<WizLight[]>
        },
        set: {
            all: (state: Partial<WizLight["colorState"]>) => Promise<WizLight["colorState"]>,
            byIP: (state: Partial<WizLight["colorState"]>, ips: string[] | string) => Promise<WizLight["colorState"]>
            alias: (alias: string, mac: string) => Promise<void>
        },
        pin: (mac: string) => Promise<void>,
        refresh: () => Promise<WizLight[]>
    },
    groups: {
        get: {
            pinned: () => Promise<PinnedStore["groups"]>
        },
        pin: (id: string) => Promise<void>,
        aliases: {
            get: () => Promise<GroupsStore["aliases"]>,
            set: (id: string, alias: string) => Promise<void>
        }
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