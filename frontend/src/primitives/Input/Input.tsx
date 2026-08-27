import React from "react";
import styles from "./Input.module.css";

type InputVariant =
    | "standard"
    | "filled"
    | "dotted";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    function Input(
        {
            variant = "standard",
            className = "",
            ...props
        },
        ref
    ) {
        return (
            <input
                ref={ref}
                className={[
                    styles.input,
                    styles[`input-${variant}`],
                    className,
                ].join(" ")}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;