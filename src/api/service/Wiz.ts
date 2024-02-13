import { WizLight, WizLightManager } from "wiz-lights-manager";

const manager = new WizLightManager();
manager.init();

export async function getLights() {
    const lights = manager.allLights.lights.filter((light) => !!light.systemConfig);
    
    return serialize(lights);
}

export async function refresh() {
    await manager.init();
    
    return getLights();
}

export async function setState(state: WizLight["colorState"], ips?: string[] | string) {    
    if(!ips) {
        manager.allLights.lights.forEach(async (light) => await light.setState(state));
        return state;
    }

    if (typeof ips === "string") {
        ips = [ips];
    }

    const lights = manager.allLights.lights.filter((light) => ips.includes(light.ip));
    lights.forEach(async (light) => await light.setState(state));

    return state;
    
}

function serialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}