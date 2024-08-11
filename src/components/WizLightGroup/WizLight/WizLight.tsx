import { useMemo } from "react";

import type { WizLight as WizLightProps } from "wiz-lights-manager";

import { getColorType } from "./getColorType";

import { useLights } from "@/stores/lights";

import Controls from "../Controls/Controls";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";

export default function WizLight(props: WizLightProps) {
    const setState = useLights((state) => state.setState);

    const type = useMemo(() => {
        return getColorType(props.colorState);
    }, [props.colorState]);

    return (
        <Card
            className={cn("flex flex-col shadow-lg rounded-md ", {
                "opacity-50": !props.colorState.state,
            })}
        >
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between">
                        {props.alias || props.ip}
                        <Switch
                            checked={props.colorState.state}
                            onClick={() => {
                                setState({
                                    ...props.colorState,
                                    state: !props.colorState.state,
                                }, props.ip);
                            }}
                        />
                    </div>
                </CardTitle>
                <CardDescription>
                    MAC Adress: {props.systemConfig.mac}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Controls
                    state={props.colorState}
                    setState={setState}
                    ips={props.ip}
                    type={type}
                />
            </CardContent>
        </Card>
    );

}