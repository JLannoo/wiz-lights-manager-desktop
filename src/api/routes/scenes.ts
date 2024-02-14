import * as Wiz from "@api/service/Wiz";
import { api } from "@api/router";

api.route("scenes")
    .handler("get", async (_event) => {
        return await Wiz.getAvailableScenes();
    });