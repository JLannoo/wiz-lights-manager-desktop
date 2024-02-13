import { WizLight } from "wiz-lights-manager";
import { api } from "@api/router";
import * as Wiz from "@api/service/Wiz";

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
    });

api.route("lights")
    .route("set")
    .handler("all", async (_event, state: WizLight["colorState"]) => {
        return await Wiz.setState(state);
    })
    .handler("byIP", async (_event, state: WizLight["colorState"], ip: string[] | string) => {            
        return await Wiz.setState(state, ip);
    });