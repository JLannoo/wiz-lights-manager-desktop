import { Combobox } from "@/components/Combobox/Combobox";
import { InputWithLabel } from "@/components/Inputs/InputWithLabel";
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
        <>
            <Combobox
                label="Scene"
                unselectedText="None available"
                searchPlaceholder="Search scenes"
                noOptionsText="No scenes available"
                options={Object.entries(scenes)
                    .map(([name, id]) => ({ 
                        value: id.toString(), 
                        label: name }),
                    )
                }
                value={props.tempState.sceneId?.toString()}
                onChange={(value) => props.setTempState({ ...props.tempState, sceneId: parseInt(value) })}
            />

            <InputWithLabel
                id="speed"
                type="slider"
                label="Speed"
                secondaryLabel={`${props.tempState.speed}`}
                value={props.tempState.speed?.toString()}
                onChange={(value) => props.setTempState({ ...props.tempState, speed: parseInt(value) })}
            />
        </>
    );
}