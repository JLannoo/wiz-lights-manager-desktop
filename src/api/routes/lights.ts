import { WizLight } from "wiz-lights-manager";
import { api } from "@api/router";
import * as Wiz from "@api/service/Wiz";

import { SystemStorage } from "@api/storage/store";

api.route("lights")
    .handler("refresh", async (_event) => {
        return await Wiz.refresh();
    });

api.route("lights")
    .route("get")
    .handler("all", async (_event) => {
        return await Wiz.getLights();
    })
    .handler("byIP", async (_event, ip: string) => {
        const lights = await Wiz.getLights();
        return lights.filter((light) => light.ip === ip);
    })
    .handler("aliases", async (_event) => {
        return SystemStorage.get("lights.aliases");
    });

api.route("lights")
    .route("set")
    .handler("all", async (_event, state: WizLight["colorState"]) => {
        return await Wiz.setState(state);
    })
    .handler("byIP", async (_event, state: WizLight["colorState"], ip: string[] | string) => {            
        return await Wiz.setState(state, ip);
    })
    .handler("alias", async (_event, alias: string, mac: string) => {
        const aliases = SystemStorage.get("lights.aliases") as { mac: string; alias: string }[];
        const existing = aliases.find((a) => a.mac === mac);
        if (existing) {
            existing.alias = alias;
        } else {
            aliases.push({ mac, alias });
        }

        console.log(`Setting alias for light ${mac} to ${alias}`);

        SystemStorage.set("lights.aliases", aliases);
    });