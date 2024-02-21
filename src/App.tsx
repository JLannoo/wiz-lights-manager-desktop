import { useEffect } from "react";
import styles from "./App.module.scss";

import WizLightGroup from "./components/WizLightGroup/WizLightGroup";

import { useLights } from "./stores/lights";
import WizLight from "./components/WizLightGroup/WizLight/WizLight";
import { useGroups } from "./stores/groups";

export default function App() {
    const { lights, refresh: refreshLights } = useLights();
    const { groups, refresh: refreshGroups } = useGroups();
    

    useEffect(() => { 
        refreshLights();
        refreshGroups();
    }, []);

    return (
        <div className={styles.App}>
            <h1>Wiz Lights</h1>
            <div className={styles.lights}>
                {lights.map((light) => (
                    <WizLight key={light.systemConfig.mac} {...light} />
                ))}
                {groups().map((group) => (
                    group.lights.length ? 
                        <WizLightGroup key={group.id} id={group.id} alias={group.alias} lights={group.lights} />
                        : null
                ))}
            </div>
        </div>
    );
}