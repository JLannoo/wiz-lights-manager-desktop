import { useEffect } from "react";
import styles from "./App.module.scss";

import WizLight from "./components/WizLight/WizLight";

import { useLights } from "./stores/lights";
import { useLoading } from "./stores/loading";

export default function App() {
    const {lights, refresh} = useLights();
    const loading = useLoading((state) => state.loading);

    useEffect(() => { refresh() }, [refresh]);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Lights</h1>
            <ul className={styles.WizLightList}>
                {lights.map((light) => (
                    <WizLight key={light.systemConfig.mac} {...light} />
                ))}
            </ul>
            <button onClick={refresh}>Refresh</button>
        </div>
    )
}