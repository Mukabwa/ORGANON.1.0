import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "muted";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

export default function Button({
    variant = "primary",
    children,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={[
                styles.button,
                styles[`button-${variant}`],
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </button>
    );
}