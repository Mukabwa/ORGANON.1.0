import React from "react";

import styles from "./Switch.module.css";

type SwitchVariant =
    | "standard"
    | "gradient";

interface SwitchProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {
    variant?: SwitchVariant;
}

export default function Switch({
    variant = "standard",
    className = "",
    ...props
}: SwitchProps) {

    return (
        <label
            className={[
                styles.switch,
                styles[`switch-${variant}`],
                className,
            ].join(" ")}
        >

            <input
                type="checkbox"
                {...props}
            />

            <span className={styles.track}>
                <span className={styles.thumb} />
            </span>

        </label>
    );
}