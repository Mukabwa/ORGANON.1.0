import React from "react";

import styles from "./ProgressBar.module.css";


type ProgressVariant =
    | "straight"
    | "circle"
    | "icon";


interface ProgressBarProps
    extends React.HTMLAttributes<HTMLDivElement> {

    value?: number;

    variant?: ProgressVariant;

}


export default function ProgressBar({

    value = 0,

    variant = "straight",

    className = "",

    ...props

}: ProgressBarProps) {

    const progress = Math.min(
        100,
        Math.max(0, value)
    );


    return (

        <div

            className={[

                styles.progress,

                styles[`progress-${variant}`],

                className,

            ].join(" ")}

            {...props}

        >

            {/* ==========================================
                STRAIGHT
            ========================================== */}

            {variant === "straight" && (

                <div className={styles.track}>

                    <div

                        className={styles.fill}

                        style={{
                            width: `${progress}%`,
                        }}

                    />

                </div>

            )}


            {/* ==========================================
                CIRCLE
            ========================================== */}

            {variant === "circle" && (

                <div className={styles.circle}>

                    <div className={styles.circleTrack} />

                    <div className={styles.circleFillShadow} />

                    <div

                        className={styles.circleFill}

                        style={{
                            "--progress": `${progress}%`,
                        } as React.CSSProperties}

                    />

                </div>

            )}


            {/* ==========================================
                ICON
            ========================================== */}

            {variant === "icon" && (

                <div

                    className={styles.iconProgress}

                    style={{
                        "--progress": `${progress}%`,
                    } as React.CSSProperties}

                >

                    <div className={styles.iconTrack}>

                        <div className={styles.iconFill} />

                    </div>

                </div>

            )}

        </div>

    );

}