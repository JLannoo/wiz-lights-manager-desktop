import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TooltipContent, Tooltip, TooltipTrigger } from "../ui/tooltip";

import { Edit } from "lucide-react";

type ChangeableTextProps = {
    value: string;
    className?: string;
    tooltip?: string;
    onChange: (value: string) => void;
};

export default function ChangeableText(props: ChangeableTextProps) {
    const [editing, setEditing] = useState(false);

    return (
        <div className="flex items-center gap-2">
            {editing ?
                <Input
                    className="text-3xl font-bold"
                    defaultValue={props.value}
                    onBlur={(e) => {
                        setEditing(false);
                        props.onChange(e.target.value);
                    }}
                    autoFocus
                />
                :
                <h3 className="text-3xl font-bold">
                    {props.value}
                </h3>
            }
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    <Button variant="ghost" onClick={() => setEditing(!editing)}>
                        <Edit size={24} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                    {props.tooltip || "Edit"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
}