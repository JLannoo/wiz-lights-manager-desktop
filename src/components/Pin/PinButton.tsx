import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "../ui/tooltip";

import { Pin } from "lucide-react";

type PinButtonProps = {
    value: boolean;
    tooltip?: string;
    onClick: () => void;
};

export default function PinButton(props: PinButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger
                onClick={props.onClick}
                data-active={props.value}
                className="p-2 rounded-full bg-muted data-[active=true]:bg-primary transition-colors w-min"
            >
                <Pin size={20} strokeWidth={2}/>
            </TooltipTrigger>
            <TooltipContent>
                {props.tooltip || props.value ? "Unpin" : "Pin"}
            </TooltipContent>
        </Tooltip>
    );
}