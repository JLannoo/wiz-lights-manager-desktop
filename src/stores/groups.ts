import { GroupsStore } from "@/api/storage/store";
import { WizLight } from "wiz-lights-manager";
import { create } from "zustand";

import { useLights } from "./lights";
import { useLoading } from "./loading";

type Group = { id: string, alias: string, lights: WizLight[] }

export type GroupState = {
    aliases: GroupsStore["aliases"]
    groups: () => Group[]
    refresh: () => Promise<void>
    setAlias: (id: string, alias: string) => Promise<void>
}

export const useGroups = create<GroupState>((set, get) => ({
    aliases: [],
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

        useLoading.getState().setLoading(false);
        set({ aliases });
    },
    setAlias: async (id, alias) => {
        await window.api.groups.aliases.set(id, alias);
        await get().refresh();
    },
}));