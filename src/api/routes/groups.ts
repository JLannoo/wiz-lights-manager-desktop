import { api } from "../router";
import { GroupsStore, SystemStorage } from "../storage/store";

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