import { Grip as GripIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type GripProps = {
    size?: number;
    tooltip?: string;
}

export default function Grip({ size = 24, tooltip = "Drag to move" }: GripProps) {
    return (
        <Tooltip>
            <TooltipTrigger className="cursor-grab">
                <GripIcon size={size} style={{
                    // @ts-expect-error -webkit-app-region is not a standard css property
                    "-webkit-app-region": "drag",
                }}/>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    );
}