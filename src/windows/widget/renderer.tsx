import "../../index.css";

import { createRoot } from "react-dom/client";
import { useEffect } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import { useGroups } from "@/stores/groups";
import { useLights } from "@/stores/lights";

import WizLight from "@/components/WizLightGroup/WizLight/WizLight";
import WizLightGroup from "@/components/WizLightGroup/WizLightGroup";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = createRoot(rootElement);
    root.render(
        <TooltipProvider>
            <Scenes />
        </TooltipProvider>,
    );
}

function Scenes() {
    const lights = useLights();
    const groups = useGroups();

    const id = new URLSearchParams(window.location.search).get("id");
    const isGroup = Number() || id === "Ungrouped";

    useEffect(() => {
        lights.refresh();
        groups.refresh();
    }, []);

    const light = lights.lights.find((light) => light.systemConfig.mac === id);
    const group = groups.groups().find((group) => group.id == id);

    console.log({
        id,
        isGroup,
        light,
        group,
    });
    
    
    return (
        (light || group) ? (
            isGroup ?
                <WizLightGroup {...group} isWidget />
                :
                <WizLight {...light} isWidget />
        ) : (
            <div className="flex items-center justify-center h-full flex-col">
                <div className="w-5 h-5 bg-primary rounded-full animate-ping" />
                <h1 className="text-white text-xl mt-2">Loading</h1>
            </div>
        )
    );
}