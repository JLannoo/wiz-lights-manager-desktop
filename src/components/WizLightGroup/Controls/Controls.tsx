import { useEffect, useMemo, useState } from "react";

import type { WizLight } from "wiz-lights-manager";

import { useDebounce } from "@/hooks/useDebounce";

import RGBControl, { RGBState } from "./ColorControls/RGBControl";
import KelvinControl, { KelvinState } from "./ColorControls/KelvinControl";
import SceneControl, { SceneState } from "./ColorControls/SceneControl";

import { DEFAULT_RGB_STATE, DEFAULT_SCENE_STATE, DEFAULT_TEMP_STATE } from "./defaults";

import { Combobox } from "@/components/Combobox/Combobox";
import { InputWithLabel } from "@/components/Inputs/InputWithLabel";

type ColorState = RGBState | KelvinState | SceneState;

type ControlsProps = {
    type: ColorState["type"];
    state: WizLight["colorState"];
    setState: (state: WizLight["colorState"], ips: string[] | string) => void;
    ips: string[] | string;
};

const COLOR_OPTIONS = [
    { value: "rgb", label: "RGB" },
    { value: "temp", label: "Temperature" },
    { value: "scene", label: "Scenes" },
];

export default function Controls(props: ControlsProps) {
    const [tempState, setTempState] = useState(props.state);

    useDebounce(tempState, 100, (value) => {
        if(JSON.stringify(value) !== JSON.stringify(props.state)) {
            props.setState(value, props.ips);
        }
    });

    useEffect(() => {
        if(JSON.stringify(tempState) !== JSON.stringify(props.state)) {
            setTempState(props.state);
        }
    }, [props.state]);

    const controls = useMemo(() => {
        if(tempState === null) return;

        switch(props.type) {
        case "rgb":
            return <RGBControl
                tempState={tempState}
                setTempState={setTempState}
            />;
        case "temp":
            return <KelvinControl
                tempState={tempState}
                setTempState={setTempState}
            />;
        case "scene":
            return <SceneControl
                tempState={tempState}
                setTempState={setTempState}
            />;
        default:
            return <p>Unknown color type</p>;
        }
    }, [props.type, tempState]);

    /**
     * Change the controls based on the color type
     * 
     * It shouldn't send a request to the light nor update the state.
     * Only change the controls so then the controls can update the state.
     */
    function onColorTypeChange(value: string) {
        switch(value) {
        case "rgb":
            setTempState(DEFAULT_RGB_STATE);
            break;
        case "temp":
            setTempState(DEFAULT_TEMP_STATE);
            break;
        case "scene":
            setTempState(DEFAULT_SCENE_STATE);
            break;
        }
    }
    
    return (
        <div className="flex flex-col gap-4">
            <Combobox
                onChange={onColorTypeChange}
                options={COLOR_OPTIONS}
                value={props.type}
                unselectedText="Select color type"
                noOptionsText="No color types"
                searchPlaceholder="Search color type..."
            />

            <InputWithLabel
                id="brightness"
                type="slider"
                label="Brightness"
                secondaryLabel={`${tempState?.dimming}%`}
                value={tempState?.dimming.toString()}
                onChange={(value) => setTempState({ ...tempState, dimming: parseInt(value) })}
            />
            
            {controls}
        </div>
    );
}