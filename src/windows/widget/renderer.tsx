import { useLights } from "@/stores/lights";
import "../../index.css";

import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import WizLight from "@/components/WizLightGroup/WizLight/WizLight";
import { TooltipProvider } from "@/components/ui/tooltip";

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

    const id = new URLSearchParams(window.location.search).get("id");    

    useEffect(() => {
        lights.refresh();
    }, []);

    const light = lights.lights.find((light) => light.systemConfig.mac === id);
    
    return (
        light ? (
            <WizLight {...light} isWidget />
        ) : (
            <div className="flex items-center justify-center h-full flex-col">
                <div className="w-5 h-5 bg-primary rounded-full animate-ping" />
                <h1 className="text-white text-xl mt-2">Loading</h1>
            </div>
        )
    );
}