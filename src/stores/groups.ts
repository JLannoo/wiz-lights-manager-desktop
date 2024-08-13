import { GroupsStore } from "@/api/storage/store";
import { WizLight } from "wiz-lights-manager";
import { create } from "zustand";

import { useLights } from "./lights";
import { useLoading } from "./loading";

type Group = { id: string, alias: string, lights: WizLight[] }

export type GroupState = {
    aliases: GroupsStore["aliases"]
    pinned: Group[]
    groups: () => Group[]

    refresh: () => Promise<void>
    setAlias: (id: string, alias: string) => Promise<void>

    getPinned: () => Promise<Group[]>
    pin: (id: string) => Promise<void>
}

export const useGroups = create<GroupState>((set, get) => ({
    aliases: [],
    pinned: [],
    groups: () => {
        return useLights.getState().lights.reduce((acc, light) => {
            const groupId = light.systemConfig?.groupId || "Ungrouped";
            const alias = get().aliases?.find((group) => group.id === groupId.toString())?.alias || groupId;

            const groupExists = acc.some((group) => group.id === groupId);
            
            if (!groupExists) {
                acc.push({ id: groupId, alias, lights: [light] });
            } else {
                acc.find((group) => group.id === groupId)?.lights.push(light);
            }


            return acc;
        }, [] as Group[]);
    },
    refresh: async () => {
        useLoading.getState().setLoading(true);

        const aliases = await window.api.groups.aliases.get();
        const pinned = await get().getPinned();

        useLoading.getState().setLoading(false);
        set({ aliases, pinned });
    },
    setAlias: async (id, alias) => {
        await window.api.groups.aliases.set(id, alias);
        await get().refresh();
    },
    getPinned: async () => {
        const pinned = await window.api.groups.get.pinned();
        return get().groups().filter((group) => pinned.some((pinned) => pinned.id == group.id));
    },
    pin: async (id) => {
        await window.api.groups.pin(id);

        const pinned = await get().getPinned();
        set({ pinned });
    },
}));