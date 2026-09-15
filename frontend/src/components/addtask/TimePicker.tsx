"use client";

import { useEffect, useState } from "react";
import Icon from "../../primitives/Icon/Icon";
import styles from "../../styles/components/addtask/TimePicker.module.css";

interface TimePickerProps {
    value?: string;
    onChange?: (value: string) => void;
}

interface WheelProps {
    value: number | string;
    values: (number | string)[];
    onSelect: (value: number | string) => void;
    label: string;
    padValue?: boolean;
}

function Wheel({
    value,
    values,
    onSelect,
    label,
    padValue = false,
}: WheelProps) {
    const currentIndex = values.indexOf(value);

    const movePrevious = () => {
        const nextIndex =
            currentIndex <= 0
                ? values.length - 1
                : currentIndex - 1;

        onSelect(values[nextIndex]);
    };

    const moveNext = () => {
        const nextIndex =
            currentIndex >= values.length - 1
                ? 0
                : currentIndex + 1;

        onSelect(values[nextIndex]);
    };

    return (
        <div className={styles.wheel}>
            <button
                type="button"
                className={styles.arrow}
                onClick={movePrevious}
                aria-label={`Previous ${label}`}
            >
                <Icon
                    name="chevron-up"
                    variant="standard"
                    size={11}
                />
            </button>

            <span className={styles.value}>
                {typeof value === "number" && padValue
                    ? value.toString().padStart(2, "0")
                    : value}
            </span>

            <button
                type="button"
                className={styles.arrow}
                onClick={moveNext}
                aria-label={`Next ${label}`}
            >
                <Icon
                    name="chevron-down"
                    variant="standard"
                    size={11}
                />
            </button>
        </div>
    );
}

export default function TimePicker({
    value = "09:00 AM",
    onChange,
}: TimePickerProps) {
    const initialMatch = value.match(
        /^(\d{2}):(\d{2})\s?(AM|PM)$/i
    );

    const initialHour = initialMatch
        ? Number(initialMatch[1])
        : 9;

    const initialMinute = initialMatch
        ? Number(initialMatch[2])
        : 0;

    const initialPeriod = initialMatch
        ? initialMatch[3].toUpperCase()
        : "AM";

    const [hour, setHour] = useState(
        initialHour >= 1 && initialHour <= 12
            ? initialHour
            : 9
    );

    const [minuteTens, setMinuteTens] = useState(
        Math.floor(initialMinute / 10)
    );

    const [minuteOnes, setMinuteOnes] = useState(
        initialMinute % 10
    );

    const [period, setPeriod] = useState(initialPeriod);

    const minute = `${minuteTens}${minuteOnes}`;

    useEffect(() => {
        onChange?.(
            `${hour.toString().padStart(2, "0")}:${minute} ${period}`
        );
    }, [
        hour,
        minuteTens,
        minuteOnes,
        period,
        onChange,
        minute,
    ]);

    return (
        <div className={styles.picker}>
            <div
                className={styles.controls}
                aria-label="Select time"
            >
                <Wheel
                    value={hour}
                    values={[
                        1, 2, 3, 4, 5, 6,
                        7, 8, 9, 10, 11, 12,
                    ]}
                    onSelect={(value) =>
                        setHour(Number(value))
                    }
                    label="hour"
                    padValue
                />

                <span className={styles.separator}>:</span>

                <Wheel
                    value={minuteTens}
                    values={[0, 1, 2, 3, 4, 5]}
                    onSelect={(value) =>
                        setMinuteTens(Number(value))
                    }
                    label="minute tens"
                />

                <Wheel
                    value={minuteOnes}
                    values={[
                        0, 1, 2, 3, 4,
                        5, 6, 7, 8, 9,
                    ]}
                    onSelect={(value) =>
                        setMinuteOnes(Number(value))
                    }
                    label="minute ones"
                />

                <Wheel
                    value={period}
                    values={["AM", "PM"]}
                    onSelect={(value) =>
                        setPeriod(String(value))
                    }
                    label="period"
                />
            </div>
        </div>
    );
}