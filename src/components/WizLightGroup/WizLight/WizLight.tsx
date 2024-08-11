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
import ChangeableText from "@/components/Inputs/ChangeableText";
import PinButton from "@/components/Pin/PinButton";

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
            })}
        >   
            <div className="absolute -top-3 -left-3">
                <PinButton
                    value={false}
                    tooltip="Pin to desktop"
                    onClick={() => console.log("Pin to desktop")}
                />
            </div>
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