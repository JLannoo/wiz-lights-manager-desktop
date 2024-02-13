import { ipcMain, ipcRenderer } from "electron";

export interface Router {
    getFullPath(): string;
    route(subPath: string): Router;
    handler(name: string, handler: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any): void;
}

export class Router implements Router {
    parent?: Router;
    subPath: Router[] = [];
    path: string;
    handlers: { [key: string]: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any } = {};

    constructor(path: string, parent?: Router) {
        this.path = path;
        this.parent = parent;
    }

    getFullPath(): string {
        if (this.parent) {
            return `${this.parent.getFullPath()}:${this.path}`;
        }

        return this.path;
    }

    route(subPath: string) {
        const existing = this.subPath.find((sub) => sub.path === subPath);
        if (existing) return existing;

        const sub = new Router(subPath, this);
        this.subPath.push(sub);
        return sub;
    }

    handler(name: string, handler: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any) {
        const handlerName = `${this.getFullPath()}:${name}`;
        console.log(`Registering handler: ${handlerName}`);
        
        ipcMain.handle(handlerName, handler);

        this.handlers[name] = handler;

        return this;
    }

    getExposeObject() {
        const obj: { [key: string]: any } = {};

        for (const sub of this.subPath) {
            obj[sub.path] = sub.getExposeObject();
        }

        for (const key in this.handlers) {
            obj[key] = (...args: any[]) => ipcRenderer.invoke(`${this.getFullPath()}:${key}`, ...args);
        }

        return obj;
    }
}

export const api = new Router("api");

