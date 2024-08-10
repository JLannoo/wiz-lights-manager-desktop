import { InputWithLabel } from "@/components/Inputs/InputWithLabel";
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
        <InputWithLabel
            id="temp"
            type="slider"
            inputProps={{
                min: 2200,
                max: 6500,
                step: 100,
            }}
            label="Temperature"
            secondaryLabel={`${props.tempState.temp}K`}
            value={props.tempState.temp.toString()}
            onChange={(value) => props.setTempState({ ...props.tempState, temp: parseInt(value) })}
        />
    );
}