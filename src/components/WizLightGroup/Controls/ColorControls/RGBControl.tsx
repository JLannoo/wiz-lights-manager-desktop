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
    setTempState: (state: unknown) => void;
}

import { InputWithLabel } from "@/components/Inputs/InputWithLabel";

export default function RGBControl(props: RGBControlProps) {
    if(!("r" in props.tempState)) return null;

    return (
        <>
            <InputWithLabel
                id="color"
                type="color"
                label="Color"
                secondaryLabel={`rgb(${props.tempState.r}, ${props.tempState.g}, ${props.tempState.b})`}
                value={RGBToHex(props.tempState.r, props.tempState.g, props.tempState.b)}
                onChange={(value) => {
                    const [r, g, b] = HexToRGB(value);
                    props.setTempState({...props.tempState, r, g, b});
                }}
            />
        </>
    );
}