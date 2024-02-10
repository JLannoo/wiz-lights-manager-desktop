import { useMemo, useState } from "react";
import style from "./WizLight.module.scss";

import { WizLight as WizLightProps } from "wiz-lights-manager";

import { getColor } from "./getColor";
import { HexToRGB, RGBToHex } from "../../utils/color";

import { useLights } from "../../stores/lights";
import { useDebounce } from "../../hooks/useDebounce";

export default function WizLight(props: WizLightProps) {
    const setState = useLights((state) => state.setState)
    const color = useMemo(() => getColor(props.colorState), [props.colorState])

    const [tempState, setTempState] = useState({
        dimming: props.colorState.dimming,
        state: props.colorState.state,
        r: color.r,
        g: color.g,
        b: color.b
    });
    
    useDebounce(tempState, 100, (value) => {
        setState(value, props.ip);
    });

    return (
        <li 
            key={props.systemConfig.mac} 
            className={style.WizLight} 
            style={{
                backgroundColor: `rgb(${Object.values(color).join(",")})`,
                opacity: color.a 
            }}
        >
            <h3>{props.ip}</h3>
            <p>MAC: {props.systemConfig.mac}</p>

            <button onClick={() => {
                setTempState((state) => ({...state, state: !state.state}));
            }}>
                {props.colorState.state ? "Turn Off" : "Turn On"}
            </button>

            <input 
                type="range" 
                min={0} 
                max={100}
                value={tempState.dimming}
                onChange={(e) => {
                    setTempState((state) => ({...state, dimming: Number(e.target.value)}));
                }}
            />

            <input 
                type="color" 
                name="color"
                id="color"
                value={RGBToHex(color.r, color.g, color.b)}
                onChange={(e) => {
                    const [r, g, b] = HexToRGB(e.target.value);
                    setTempState((state) => ({...state, r, g, b}));
                }}
            />
            <label htmlFor="color">
                {`rgb(${Object.values(color).join(",")})`}
            </label>
        </li>
    )

}