import { WizLight } from "wiz-lights-manager"
import { create } from "zustand"

import { useLoading } from "./loading"

type LightState = {
    lights: WizLight[]
    refresh: () => Promise<void>
    get: (ip: string) => Promise<WizLight | undefined>
    setState: (state: Partial<WizLight["colorState"]>, ip?: string) => Promise<void>
}

export const useLights = create<LightState>((set, get) => ({
    lights: [],
    refresh: async () => {
        useLoading.getState().setLoading(true)

        const lights = await window.api.lights.refresh()
        useLoading.getState().setLoading(false)

        set({ lights })
    },
    get: async (ip: string) => {
        useLoading.getState().setLoading(true)

        const light = await window.api.lights.get.byIP(ip)

        useLoading.getState().setLoading(false)
        return light
    },
    setState: async (state, ip) => {
        try {
            await window.api.lights.set.byIP(state, ip)
            
            const lights = get().lights.map((light) => {
                if (light.ip === ip) {
                    return {...light, colorState: {...light.colorState, ...state}}
                } else {
                    return light
                }
            })

            set({ lights })
        } catch (e) {
            console.error(e)
        }
    }
}))