import { WizLight } from "wiz-lights-manager";
import { api } from "@api/router";
import * as Wiz from "@api/service/Wiz";

import { PinnedStore, SystemStorage } from "@api/storage/store";

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
    })
    .handler("pinned", async (_event) => {
        const pinned = SystemStorage.get("pinned") as PinnedStore;
        const lights = await Wiz.getLights();
        return lights.filter((light) => pinned.lights.some((pinned) => pinned.mac === light.systemConfig?.mac));
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

api.route("lights")
    .handler("pin", async (_event, mac: string) => {
        const pinned = SystemStorage.get("pinned") as PinnedStore;
        const existing = pinned.lights.find((pinned) => pinned.mac === mac);

        if (existing) {
            console.log(`Unpinning light ${mac}`);
            pinned.lights = pinned.lights.filter((pinned) => pinned.mac !== mac);
        } else {
            console.log(`Pinning light ${mac}`);
            pinned.lights.push({ mac, x: 0, y: 0, width: 0, height: 0 });
        }

        SystemStorage.set("pinned", pinned);
    });