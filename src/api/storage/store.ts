import Store from "electron-store";

export type GroupsStore = {
    aliases: { id: string; alias: string }[];
};

export type LightsStore = {
    aliases: { mac: string; alias: string }[];
};

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
    },
    defaults: {
        groups: {
            aliases: [],
        },
        lights: {
            aliases: [],
        },
    },
});
