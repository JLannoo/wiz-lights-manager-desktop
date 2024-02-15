import RangeNumberCombo from "@/components/Inputs/RangeNumberCombo";
import { WizLight } from "wiz-lights-manager";

export type KelvinState = {
    type: "temp";
    temp: number;
}

export type KelvinControlProps = {
    tempState: WizLight["colorState"];
    setTempState: (state: any) => void;
}

export default function KelvinControl(props: KelvinControlProps) {
    if(!("temp" in props.tempState)) return null;

    return (
        <RangeNumberCombo
            label="Temperature:"
            unit="K"
            inputProps={{
                min: 2200,
                max: 6500,
                value: props.tempState.temp,
                onChange: (e) => props.setTempState({ ...props.tempState, temp: parseInt(e.target.value) }),
            }}
        />
    );
}