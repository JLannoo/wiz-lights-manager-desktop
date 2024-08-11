import Store from "electron-store";

export type GroupsStore = {
    aliases: { id: string; alias: string }[];
};

export type LightsStore = {
    aliases: { mac: string; alias: string }[];
};

export type PinnedStore = {
    groups: { id: string; x: number; y: number; width: number; height: number }[];
    lights: { mac: string; x: number; y: number; width: number; height: number }[];
};
export type AllPins = PinnedStore["groups"][number] | PinnedStore["lights"][number];

export const SystemStorage = new Store({
    schema: {
        groups: {
            type: "object",
            properties: {
                aliases: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            alias: { type: "string" },
                        },
                    },
                },
            },
        },
        lights: {
            type: "object",
            properties: {
                aliases: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            mac: { type: "string" },
                            alias: { type: "string" },
                        },
                    },
                },
            },
        },
        pinned: {
            type: "object",
            properties: {
                groups: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            x: { type: "number" },
                            y: { type: "number" },
                            width: { type: "number" },
                            height: { type: "number" },
                        },
                    },
                },
                lights: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            mac: { type: "string" },
                            x: { type: "number" },
                            y: { type: "number" },
                            width: { type: "number" },
                            height: { type: "number" },
                        },
                    },
                },
            },
        },
    },
    defaults: {
        groups: {
            aliases: [],
        },
        lights: {
            aliases: [],
        },
        pinned: {
            groups: [],
            lights: [],
        },
    },
});
