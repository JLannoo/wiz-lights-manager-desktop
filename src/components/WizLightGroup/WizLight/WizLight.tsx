import { useMemo } from "react";
import style from "./WizLight.module.scss";

import type { WizLight as WizLightProps } from "wiz-lights-manager";

import { getDisplayColor } from "./getDisplayColor";
import { getColorType } from "./getColorType";

import { useLights } from "@/stores/lights";

import Controls from "../Controls/Controls";

export default function WizLight(props: WizLightProps) {
    const setState = useLights((state) => state.setState);
    
    const displayColor = useMemo(() => getDisplayColor(props.colorState), [props.colorState]);    

    const type = useMemo(() => {
        return getColorType(props.colorState);
    }, [props.colorState]);

    return (
        <li 
            key={props.systemConfig.mac}
            className={style.WizLight}
            style={{
                backgroundColor: `rgb(${Object.values(displayColor).join(",")})`,
                opacity: displayColor.a, 
            }}
        >
            <h3>{props.ip}</h3>

            <Controls
                state={props.colorState}
                setState={setState}
                ips={props.ip}
                type={type}
            />
        </li>
    );

}