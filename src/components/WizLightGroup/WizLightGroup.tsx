import { useEffect, useMemo, useState } from "react";

import { WizLight as WizLightType } from "wiz-lights-manager";

import { useLights } from "@/stores/lights";
import { useLoading } from "@/stores/loading";
import { useGroups } from "@/stores/groups";

import WizLight from "./WizLight/WizLight";
import Controls from "./Controls/Controls";
import { getColorType } from "./WizLight/getColorType";

import { Card, CardContent, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type WizLightGroupProps = {
    id: string
    alias: string
    lights: WizLightType[]
}

export default function WizLightGroup(props: WizLightGroupProps) {
    const [groupState, setGroupState] = useState(props.lights[0].colorState);

    const { setState } = useLights((state) => state);
    const loading = useLoading((state) => state.loading);
    const setAlias = useGroups((state) => state.setAlias);

    useEffect(() => {
        const equal = props.lights.every((light) => JSON.stringify(light.colorState) === JSON.stringify(props.lights[0].colorState));
        if(equal) {
            setGroupState(props.lights[0].colorState);
            return;
        }

        const state = props.lights.some((light) => light.colorState.state);
        const dimming = Math.max(...props.lights.map((light) => light.colorState.dimming));

        setGroupState({ ...props.lights[0].colorState, state, dimming });
    }, [loading, props.lights]);

    const type = useMemo(() => {
        return getColorType(groupState);
    }, [groupState]);
    
    if (loading) return <h1>Loading...</h1>;

    function onAliasChange(e: React.FocusEvent<HTMLHeadingElement>) {
        const alias = e.target.textContent;
        if (alias === props.alias || !alias.trim().length) return;

        setAlias(props.id.toString(), alias);
    }

    return (
        <>
            <Card className="flex flex-col w-full p-2">
                <CardTitle>
                    <div className="flex justify-between items-center">
                        <h3 className="text-3xl p-4 font-bold" contentEditable onBlur={onAliasChange}>
                            {props.alias}
                        </h3>
                        <Switch onClick={() => setState({ 
                            ...groupState, 
                            state: !groupState.state, 
                        }, props.lights.map(l => l.ip))} 
                        checked={groupState.state}
                        />
                    </div>
                </CardTitle>
                <CardContent className="flex flex-col space-y-4">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="1">
                            <AccordionTrigger className="p-4">
                                See Lights
                            </AccordionTrigger>
                            <AccordionContent className="p-4">
                                {props.lights.map((light) => (
                                    <WizLight key={light.ip} {...light} />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Controls 
                        state={groupState}
                        setState={setState}
                        ips={props.lights.map((light) => light.ip)}
                        type={type}
                    />
                </CardContent>
            </Card>
        </>
    );
}