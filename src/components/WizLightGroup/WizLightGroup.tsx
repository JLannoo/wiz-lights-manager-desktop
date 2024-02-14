import { useEffect, useMemo, useState } from "react";
import styles from "./WizLightGroup.module.scss";

import { WizLight as WizLightType } from "wiz-lights-manager";

import { useLights } from "@/stores/lights";
import { useLoading } from "@/stores/loading";

import WizLight from "./WizLight/WizLight";
import Controls from "./Controls/Controls";
import { getColorType } from "./WizLight/getColorType";

type WizLightGroupProps = {
    name: string
    lights: WizLightType[]
}

export default function WizLightGroup(props: WizLightGroupProps) {
    const [groupState, setGroupState] = useState(props.lights[0].colorState);

    const { setState, refresh } = useLights((state) => state);
    const loading = useLoading((state) => state.loading);

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

    return (
        <div className={styles.WizLightGroup}>
            <h2>{props.name}</h2>
            <ul className={styles.WizLightList}>
                {props.lights.map((light) => (
                    <WizLight key={light.ip} {...light} />
                ))}
            </ul>
            <button onClick={refresh}>Refresh</button>

            <Controls 
                state={groupState}
                setState={setState}
                ips={props.lights.map((light) => light.ip)}
                type={type}
            />
        </div>
    );
}