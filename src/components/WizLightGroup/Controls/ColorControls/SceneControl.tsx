import RangeNumberCombo from "@/components/Inputs/RangeNumberCombo";
import { useEffect, useState } from "react";
import { WizLight } from "wiz-lights-manager";

export type SceneState = {
    type: "scene";
    sceneId: number;
    speed?: number;
}

export type SceneControlProps = {
    tempState: WizLight["colorState"];
    setTempState: (state: any) => void;
}

export default function SceneControl(props: SceneControlProps) {
    if(!("sceneId" in props.tempState)) return null;

    const [scenes, setScenes] = useState<{ [name: string]: number }>({});

    useEffect(() => {
        window.api.scenes.get().then(setScenes);
    }, []);

    return (
        <div>
            <select name="scene" id="scene" 
                value={props.tempState.sceneId} 
                onChange={(e) => props.setTempState({ ...props.tempState, sceneId: parseInt(e.target.value) })}
            >
                {Object.entries(scenes).map(([name, id]) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>

            <RangeNumberCombo
                label="Speed:"
                inputProps={{
                    min: 10,
                    max: 100,
                    value: props.tempState.speed,
                    onChange: (e) => props.setTempState({ ...props.tempState, speed: parseInt(e.target.value) }),
                }}
            />
        </div>
    );
}