import { useMemo } from "react";

import type { WizLight as WizLightLib } from "wiz-lights-manager";

import { getColorType } from "./getColorType";

import { useLights } from "@/stores/lights";


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";


import { cn } from "@/lib/utils";

import ChangeableText from "@/components/Inputs/ChangeableText";
import PinButton from "@/components/Pin/PinButton";
import Grip from "@/components/Grip/Grip";
import Controls from "@/components/WizLightGroup/Controls/Controls";

interface WizLightProps extends WizLightLib {
    isWidget?: boolean;
}

export default function WizLight(props: WizLightProps) {
    const setState = useLights((state) => state.setState);
    const setAlias = useLights((state) => state.setAlias);

    const type = useMemo(() => {
        return getColorType(props.colorState);
    }, [props.colorState]);

    function onAliasChange(alias: string) {
        if (alias === props.alias || !alias.trim().length) return;

        setAlias(props.systemConfig.mac, alias);
    }

    return (
        <Card
            className={cn("flex flex-col relative", {
                "opacity-50": !props.colorState.state,
                "h-full p-3": props.isWidget, // Full height and padding to accomodate pin
            })}
        >   
            <div className={cn("absolute -top-3 -left-3", {
                "top-1 left-1": props.isWidget, // Move pin inside card
            })}>
                <PinButton
                    value={false}
                    tooltip="Pin to desktop"
                    onClick={() => console.log("Pin to desktop")}
                />
            </div>

            {props.isWidget && 
            <div className="absolute top-2 right-2">
                <Grip />
            </div>}

            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between">
                        <ChangeableText value={props.alias || props.ip} onChange={onAliasChange} />
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
                    <p>MAC Adress: {props.systemConfig.mac}</p>
                    {props.alias && <p>IP: {props.ip}</p>}
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