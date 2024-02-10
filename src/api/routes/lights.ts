import { WizLight } from "wiz-lights-manager";
import { api } from "../router"
import * as Wiz from "../service/Wiz"

api.route("lights")
    .handler("refresh", async (event) => {
        return await Wiz.refresh();
    })

api.route("lights")
    .route("get")
        .handler("all", async (event) => {
            return await Wiz.getLights();
        })
        .handler("byIP", async (event, ip: string) => {
            const lights = await Wiz.getLights();
            return lights.filter((light) => light.ip === ip);
        });

api.route("lights")
    .route("set")
        .handler("all", async (event, state: WizLight["colorState"]) => {
            return await Wiz.setState(state);
        })
        .handler("byIP", async (event, state: WizLight["colorState"], ip: string) => {
            return await Wiz.setState(state, ip);
        })