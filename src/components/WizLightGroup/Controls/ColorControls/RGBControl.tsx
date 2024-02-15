import { HexToRGB, RGBToHex } from "@/utils/color";
import { WizLight } from "wiz-lights-manager";

export type RGBState = {
    type: "rgb";
    r: number;
    g: number;
    b: number;
}

type RGBControlProps = {
    tempState: WizLight["colorState"];
    setTempState: (state: any) => void;
}

export default function RGBControl(props: RGBControlProps) {
    if(!("r" in props.tempState)) return null;

    return (
        <>
            <input 
                type="color" 
                name="color"
                id="color"
                value={RGBToHex(props.tempState.r, props.tempState.g, props.tempState.b)}
                onChange={(e) => {
                    const [r, g, b] = HexToRGB(e.target.value);
                    props.setTempState({...props.tempState, r, g, b});
                }}
            />
            <label htmlFor="color">
                {`rgb(${props.tempState.r}, ${props.tempState.g}, ${props.tempState.b})`}
            </label>
        </>
    );
}