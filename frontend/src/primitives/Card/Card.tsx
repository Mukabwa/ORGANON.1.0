import React from "react";
import styles from "./Card.module.css";

type CardVariant =
    | "standard"
    | "primary"
    | "secondary"
    | "tertiary";

interface CardProps
    extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    children: React.ReactNode;
}

export default function Card({
    variant = "standard",
    children,
    className = "",
    ...props
}: CardProps) {
    return (
        <div
            className={[
                styles.card,
                styles[`card-${variant}`],
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}