import { WizLight as WizLightProps } from "wiz-lights-manager";
import style from "./WizLight.module.scss";

import { useLights } from "../../stores/lights";
import { useMemo } from "react";
import { getColor } from "./getColors";
import { RGBToHex } from "../../utils/color";

export default function WizLight(props: WizLightProps) {
    const setState = useLights((state) => state.setState)

    const color = useMemo(() => getColor(props.colorState), [props.colorState])

    function handleColorChange() {
        console.log("Color changed");
    }

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
                    setState({state: !props.colorState.state}, props.ip)
                }}>
                {props.colorState.state ? "Off" : "On"}
            </button>

            <input 
                type="range" 
                min={0} 
                max={100}
                value={props.colorState.dimming} 
                onChange={(e) => {
                    setState({dimming: parseInt(e.target.value)}, props.ip)
                }}
            />

            <input 
                type="color" 
                value={RGBToHex(color.r, color.g, color.b)}
                onChange={handleColorChange}
            />
        </li>
    )

}