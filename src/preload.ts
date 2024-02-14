// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { WizLight } from "wiz-lights-manager";

export const exposedMethods = {
    lights: {
        get: {
            all: () => ipcRenderer.invoke("api:lights:get:all"),
            byIP: (ip: string) => ipcRenderer.invoke("api:lights:get:byIP", ip),
        },
        set: {
            all: (state: WizLight["colorState"]) => ipcRenderer.invoke("api:lights:set:all", state),
            byIP: (state: WizLight["colorState"], ip: string) => ipcRenderer.invoke("api:lights:set:byIP", state, ip),
        },
        refresh: () => ipcRenderer.invoke("api:lights:refresh"),
    },
    scenes: {
        get: () => ipcRenderer.invoke("api:scenes:get"),
    },
};

contextBridge.exposeInMainWorld("api", exposedMethods);