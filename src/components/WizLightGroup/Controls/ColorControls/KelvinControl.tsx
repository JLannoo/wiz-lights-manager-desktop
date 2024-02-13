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
    if(!("temp" in props.tempState)) return `Error: Invalid temp state: ${JSON.stringify(props.tempState)}`;

    return (
        <>
            <input 
                type="range" 
                name="temp" 
                id="temp"
                min="2200"
                max="6500"
                value={props.tempState.temp}
                onChange={(e) => {
                    props.setTempState({...props.tempState, temp: Number(e.target.value)});
                }}
            />
            <label htmlFor="temp">
                {`${props.tempState.temp}K`}
            </label>
        </>
    );
}