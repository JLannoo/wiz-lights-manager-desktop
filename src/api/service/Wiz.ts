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

export async function getAvailableScenes() {
    return serialize({
        "Ocean": 1,
        "Romance": 2,
        "Sunset": 3,
        "Party": 4,
        "Fireplace": 5,
        "Cozy": 6,
        "Forest": 7,
        "Pastel Colors": 8,
        "Wake up": 9,
        "Bedtime": 10,
        "Warm White": 11,
        "Daylight": 12,
        "Cool white": 13,
        "Night light": 14,
        "Focus": 15,
        "Relax": 16,
        "True colors": 17,
        "TV time": 18,
        "Plantgrowth": 19,
        "Spring": 20,
        "Summer": 21,
        "Fall": 22,
        "Deepdive": 23,
        "Jungle": 24,
        "Mojito": 25,
        "Club": 26,
        "Christmas": 27,
        "Halloween": 28,
        "Candlelight": 29,
        "Golden white": 30,
        "Pulse": 31,
        "Steampunk": 32,
        "Diwali": 33,
        "Rhythm": 1000,
    } as const);

}

function serialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}