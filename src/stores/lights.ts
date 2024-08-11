import { WizLight } from "wiz-lights-manager";
import { create } from "zustand";

import { useLoading } from "./loading";

type LightState = {
    lights: WizLight[]
    pinned: WizLight[]
    refresh: () => Promise<void>
    get: (ip: string) => Promise<WizLight | undefined>

    setState: (state: WizLight["colorState"], ips?: string[] | string) => Promise<void>
    setAlias: (id: string, alias: string) => Promise<void>

    getPinned: () => Promise<WizLight[]>
    pin: (mac: string) => Promise<void>
}

export const useLights = create<LightState>((set, get) => ({
    lights: [],
    pinned: [],
    refresh: async () => {        
        useLoading.getState().setLoading(true);

        const lights = await window.api.lights.refresh();
        const aliases = await window.api.lights.get.aliases();
        lights.forEach((light) => {
            const alias = aliases.find((a) => a.mac === light.systemConfig?.mac);
            if (alias) light.alias = alias.alias;
        });
        set({ lights });

        const pinned = await get().getPinned();
        set({ pinned });

        useLoading.getState().setLoading(false);
    },
    get: async (ip: string) => {
        useLoading.getState().setLoading(true);

        const light = await window.api.lights.get.byIP(ip);

        useLoading.getState().setLoading(false);
        return light;
    },
    setState: async (state, ips) => {
        try {            
            await window.api.lights.set.byIP(state, ips);
            
            const lights = get().lights.map((light) => {
                if (typeof ips === "string") ips = [ips];

                if(ips.includes(light.ip)) light.colorState = state;
                return light;
            });

            set({ lights });
        } catch (e) {
            console.error(e);
        }
    },
    setAlias: async (id, alias) => {
        await window.api.lights.set.alias(alias, id);
        await get().refresh();
    },
    getPinned: async () => {
        const pinned = await window.api.lights.get.pinned();
        const lights = get().lights.filter((light) => pinned.some((pinned) => pinned.systemConfig?.mac === light.systemConfig?.mac));

        return lights;
    },
    pin: async (mac) => {
        await window.api.lights.pin(mac);
        
        const pinned = await get().getPinned();
        set({ pinned });
    },
}));