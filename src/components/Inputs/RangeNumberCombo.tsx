import styles from "./RangeNumberCombo.module.scss";

export type RangeNumberComboProps = {
    label?: string;
    unit?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function RangeNumberCombo(props: RangeNumberComboProps) {
    const rangeId = Math.random().toString(36).substring(7);
    const numberId = Math.random().toString(36).substring(7);

    return (
        <div className={styles.RangeNumberCombo}>
            {props.label && <label htmlFor={rangeId}>{props.label}</label>}
            <input type="range" {...props.inputProps} id={rangeId} />
            <input type="number" {...props.inputProps} id={numberId} />
            {props.unit && <label htmlFor={numberId}>{props.unit}</label>}
        </div>
    );
}