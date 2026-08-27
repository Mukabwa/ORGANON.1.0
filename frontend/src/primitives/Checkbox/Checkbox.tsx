import React from "react";
import { Check, X } from "lucide-react";

import styles from "./Checkbox.module.css";

type CheckboxVariant =
    | "standard"
    | "gradient"
    | "capsule"
    | "circle-x";

interface CheckboxProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: CheckboxVariant;
}

export default function Checkbox({
    variant = "standard",
    className = "",
    ...props
}: CheckboxProps) {

    const Mark = variant === "circle-x" ? X : Check;

    return (
        <label
            className={[
                styles.checkbox,
                styles[`checkbox-${variant}`],
                className,
            ].join(" ")}
        >
            <input
                type="checkbox"
                {...props}
            />

            <span className={styles.box}>

                <Mark
                    className={styles.check}
                    size={variant === "circle-x" ? 20 : 16}
                    strokeWidth={variant === "circle-x" ? 2.5 : 2.25}
                />

            </span>

        </label>
    );
}