import { useEffect } from "react";
import styles from "./App.module.scss";

import WizLightGroup from "./components/WizLightGroup/WizLightGroup";

import { useLights } from "./stores/lights";
import WizLight from "./components/WizLightGroup/WizLight/WizLight";

export default function App() {
    const { lights, groups, refresh } = useLights();

    useEffect(() => { refresh(); }, []);

    return (
        <div className={styles.App}>
            <h1>Wiz Lights</h1>
            <div className={styles.lights}>
                {lights.map((light) => (
                    <WizLight key={light.systemConfig.mac} {...light} />
                ))}
                {Object.entries(groups()).map(([id, group]) => (
                    <WizLightGroup key={id} name={id} lights={group} />
                ))}
            </div>
        </div>
    );
}