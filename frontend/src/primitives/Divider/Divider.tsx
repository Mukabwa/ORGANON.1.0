import React from "react";

import styles from "./Divider.module.css";

type DividerVariant =
    | "fade"
    | "ornament"
    | "trail";

type DividerOrientation =
    | "horizontal"
    | "vertical";

interface DividerProps
    extends React.HTMLAttributes<HTMLDivElement> {

    variant?: DividerVariant;

    orientation?: DividerOrientation;

    children?: React.ReactNode;
}

export default function Divider({
    variant = "fade",
    orientation = "horizontal",
    children,
    className = "",
    ...props
}: DividerProps) {

    return (
        <div
            className={[
                styles.divider,
                styles[`divider-${variant}`],
                styles[`divider-${orientation}`],
                className,
            ].join(" ")}
            {...props}
        >

            {variant === "ornament" ? (

                <>
                    <span className={styles.line} />

                    <span className={styles.ornament}>
                        {children}
                    </span>

                    <span className={styles.line} />
                </>

            ) : variant === "trail" ? (

                <>
                    <span className={styles.line} />

                    <span className={styles.ornament}>
                        {children}
                    </span>
                </>

            ) : (

                <span className={styles.line} />

            )}

        </div>
    );
}