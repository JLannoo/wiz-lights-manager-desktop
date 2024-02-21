// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { WizLight } from "wiz-lights-manager";

export const exposedMethods = {
    lights: {
        get: {
            all: () => ipcRenderer.invoke("api:lights:get:all"),
            byIP: (ip: string) => ipcRenderer.invoke("api:lights:get:byIP", ip),
            aliases: () => ipcRenderer.invoke("api:lights:get:aliases"),
        },
        set: {
            all: (state: WizLight["colorState"]) => ipcRenderer.invoke("api:lights:set:all", state),
            byIP: (state: WizLight["colorState"], ip: string) => ipcRenderer.invoke("api:lights:set:byIP", state, ip),
            alias: (alias: string, mac: string) => ipcRenderer.invoke("api:lights:set:alias", alias, mac),
        },
        refresh: () => ipcRenderer.invoke("api:lights:refresh"),
    },
    groups: {
        aliases: {
            get: () => ipcRenderer.invoke("api:groups:aliases:get"),
            set: (id: string, alias: string) => ipcRenderer.invoke("api:groups:aliases:set", id, alias),
        },
    },
    scenes: {
        get: () => ipcRenderer.invoke("api:scenes:get"),
    },
};

contextBridge.exposeInMainWorld("api", exposedMethods);