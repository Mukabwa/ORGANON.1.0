import React from "react";

import styles from "./Chip.module.css";

interface ChipProps
    extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function Chip({
    children,
    className = "",
    ...props
}: ChipProps) {

    return (
        <div
            className={[
                styles.chip,
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}