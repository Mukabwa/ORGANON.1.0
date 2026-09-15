"use client";

import Chip from "../../primitives/Chip/Chip";
import styles from "../../styles/components/addtask/PrioritySelector.module.css";

type Priority = "low" | "medium" | "high";

interface PrioritySelectorProps {
    value?: Priority;
    onChange?: (value: Priority) => void;
}

const OPTIONS: Priority[] = [
    "low",
    "medium",
    "high",
];

export default function PrioritySelector({
    value = "medium",
    onChange,
}: PrioritySelectorProps) {
    return (
        <div className={styles.selector}>
            {OPTIONS.map((option) => {
                const selected = value === option;

                return (
                    <button
                        key={option}
                        type="button"
                        className={[
                            styles.option,
                            selected ? styles.selected : "",
                        ].join(" ")}
                        onClick={() => onChange?.(option)}
                        aria-pressed={selected}
                    >
                        <Chip
                            className={
                                option === "low"
                                    ? styles.low
                                    : option === "medium"
                                        ? styles.medium
                                        : styles.high
                            }
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Chip>
                    </button>
                );
            })}
        </div>
    );
}