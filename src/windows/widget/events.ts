import { PinnedStore, SystemStorage } from "@/api/storage/store";
import { Widget } from "@/main";

export function onMove(widget: Widget) {
    const position = widget.window.getPosition();

    const current = SystemStorage.get("pinned.groups") as PinnedStore["groups"] || [];
    const index = current.findIndex((group) => group.id === widget.id);

    if (index === -1) return;

    current[index] = {
        ...current[index],
        x: position[0],
        y: position[1],
    };

    SystemStorage.set("pinned.groups", current);
}

export function onResize(widget: Widget) {
    const size = widget.window.getSize();
    const current = SystemStorage.get("pinned.groups") as PinnedStore["groups"] || [];
    const index = current.findIndex((group) => group.id === widget.id);

    if (index === -1) return;

    current[index] = {
        ...current[index],
        width: size[0],
        height: size[1],
    };

    SystemStorage.set("pinned.groups", current);
}

export function debounce<T, U>(ms: number, fn: (arg: T) => U) {
    let timeout: NodeJS.Timeout;
    return (arg: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(arg), ms);
    };
}