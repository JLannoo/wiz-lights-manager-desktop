import { api } from "../router";
import { GroupsStore, PinnedStore, SystemStorage } from "../storage/store";

api.route("groups")
    .route("aliases")
    .handler("get", async (_event) => {
        return SystemStorage.get("groups.aliases");
    })
    .handler("set", async (_event, id, alias) => {
        const aliases = (SystemStorage.get("groups.aliases") || []) as GroupsStore["aliases"];
        const index = aliases.findIndex((a) => a.id === id);

        console.log(`Setting alias for group ${id} to ${alias}`);

        if (index === -1) {
            aliases.push({ id, alias });
        } else {
            aliases[index].alias = alias;
        }
        
        SystemStorage.set("groups.aliases", aliases);

        return;
    });

api.route("groups")
    .route("get")
    .handler("pinned", async (_event) => {
        const pinned = SystemStorage.get("pinned") as PinnedStore;
        return pinned.groups;
    });

api.route("groups")
    .handler("pin", async (_event, id: string) => {
        const pinned = SystemStorage.get("pinned") as PinnedStore;
        const existing = pinned.groups.find((pinned) => pinned.id === id);

        if (existing) {
            console.log(`Unpinning group ${id}`);
            pinned.groups = pinned.groups.filter((pinned) => pinned.id !== id);
        } else {
            console.log(`Pinning group ${id}`);
            pinned.groups.push({ id, x: 0, y: 0, width: 300, height: 300 });
        }

        SystemStorage.set("pinned", pinned);

        return;
    });