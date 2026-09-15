"use client";

import Chip from "../../primitives/Chip/Chip";
import Icon from "../../primitives/Icon/Icon";
import styles from "../../styles/components/addtask/RecurrenceSelector.module.css";

export type RecurrenceFrequency =
    | "once"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly";

export interface RecurrenceValue {
    frequency: RecurrenceFrequency;
    daysOfWeek: string[];
    dayOfMonth: number;
}

interface RecurrenceSelectorProps {
    value?: RecurrenceValue;
    onChange?: (value: RecurrenceValue) => void;
    date?: string;
}

const OPTIONS: RecurrenceFrequency[] = [
    "once",
    "daily",
    "weekly",
    "monthly",
    "yearly",
];

const WEEKDAYS = [
    { value: "monday", label: "Mon" },
    { value: "tuesday", label: "Tue" },
    { value: "wednesday", label: "Wed" },
    { value: "thursday", label: "Thu" },
    { value: "friday", label: "Fri" },
    { value: "saturday", label: "Sat" },
    { value: "sunday", label: "Sun" },
];

function getOrdinal(day: number) {
    if (day >= 11 && day <= 13) {
        return `${day}th`;
    }

    switch (day % 10) {
        case 1:
            return `${day}st`;
        case 2:
            return `${day}nd`;
        case 3:
            return `${day}rd`;
        default:
            return `${day}th`;
    }
}

function formatTaskDate(date: string) {
    if (!date) {
        return "";
    }

    const [year, month, day] = date
        .split("-")
        .map(Number);

    const selectedDate = new Date(
        year,
        month - 1,
        day
    );

    const monthName = selectedDate.toLocaleString(
        "en-US",
        {
            month: "long",
        }
    );

    return `${getOrdinal(day)} ${monthName}`;
}

function getMonthlyConfirmation(day: number) {
    if (day <= 28) {
        return `Repeats on the ${getOrdinal(day)} of every month.`;
    }

    if (day === 29) {
        return `Repeats on the 29th of every month, or the last day of February.`;
    }

    if (day === 30) {
        return `Repeats on the 30th of every month, or the last day when a month is shorter.`;
    }

    return `Repeats on the 31st of every month, or the last day when a month is shorter.`;
}

function formatSelectedDays(days: string[]) {
    const labels = days.map((day) => {
        const match = WEEKDAYS.find(
            (weekday) => weekday.value === day
        );

        return match
            ? match.label
            : day;
    });

    if (labels.length === 1) {
        return labels[0];
    }

    if (labels.length === 2) {
        return `${labels[0]} and ${labels[1]}`;
    }

    return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]
        }`;
}

export default function RecurrenceSelector({
    value = {
        frequency: "once",
        daysOfWeek: [],
        dayOfMonth: 1,
    },
    onChange,
    date,
}: RecurrenceSelectorProps) {
    const selectFrequency = (
        frequency: RecurrenceFrequency
    ) => {
        onChange?.({
            ...value,
            frequency,
            daysOfWeek:
                frequency === "weekly"
                    ? value.daysOfWeek
                    : [],
        });
    };

    const toggleDay = (day: string) => {
        const days = value.daysOfWeek.includes(day)
            ? value.daysOfWeek.filter(
                (selectedDay) => selectedDay !== day
            )
            : [...value.daysOfWeek, day];

        onChange?.({
            ...value,
            daysOfWeek: days,
        });
    };

    const handleDayOfMonthChange = (
        nextValue: string
    ) => {
        if (nextValue === "") {
            return;
        }

        const day = Number(nextValue);

        if (Number.isNaN(day)) {
            return;
        }

        onChange?.({
            ...value,
            dayOfMonth: Math.min(
                31,
                Math.max(1, day)
            ),
        });
    };

    const renderConfirmation = () => {
        if (value.frequency === "once") {
            return (
                <div className={styles.confirmation}>
                    <Icon
                        name="calendar"
                        variant="standard"
                        size={18}
                    />
                    <span>Does not repeat.</span>
                </div>
            );
        }

        if (value.frequency === "daily") {
            return (
                <div className={styles.confirmation}>
                    <Icon
                        name="repeat"
                        variant="standard"
                        size={18}
                    />
                    <span>Repeats every day.</span>
                </div>
            );
        }

        if (value.frequency === "weekly") {
            if (value.daysOfWeek.length === 0) {
                return (
                    <div
                        className={`${styles.confirmation} ${styles.warning}`}
                    >
                        <Icon
                            name="alert-circle"
                            variant="standard"
                            size={18}
                        />
                        <span>Choose at least one day.</span>
                    </div>
                );
            }

            if (value.daysOfWeek.length === 7) {
                return (
                    <div className={styles.confirmation}>
                        <Icon
                            name="calendar"
                            variant="standard"
                            size={18}
                        />
                        <span>Repeats every day.</span>
                    </div>
                );
            }

            return (
                <div className={styles.confirmation}>
                    <Icon
                        name="calendar"
                        variant="standard"
                        size={18}
                    />
                    <span>
                        Repeats every{" "}
                        {formatSelectedDays(
                            value.daysOfWeek
                        )}
                        .
                    </span>
                </div>
            );
        }

        if (value.frequency === "monthly") {
            return (
                <div className={styles.confirmation}>
                    <Icon
                        name="calendar"
                        variant="standard"
                        size={18}
                    />
                    <span>
                        {getMonthlyConfirmation(value.dayOfMonth)}
                    </span>
                </div>
            );
        }

        const formattedDate = formatTaskDate(
            date ?? ""
        );

        if (!formattedDate) {
            return (
                <div
                    className={`${styles.confirmation} ${styles.warning}`}
                >
                    <Icon
                        name="alert-circle"
                        variant="standard"
                        size={18}
                    />
                    <span>Choose a task date first.</span>
                </div>
            );
        }

        return (
            <div className={styles.confirmation}>
                <Icon
                    name="calendar"
                    variant="standard"
                    size={18}
                />
                <span>
                    Repeats every year on{" "}
                    {formattedDate}.
                </span>
            </div>
        );
    };

    return (
        <div className={styles.selector}>
            <div className={styles.options}>
                {OPTIONS.map((option) => {
                    const selected =
                        value.frequency === option;

                    return (
                        <button
                            key={option}
                            type="button"
                            className={[
                                styles.option,
                                selected
                                    ? styles.selected
                                    : "",
                            ].join(" ")}
                            onClick={() =>
                                selectFrequency(option)
                            }
                            aria-pressed={selected}
                        >
                            {option.charAt(0).toUpperCase() +
                                option.slice(1)}
                        </button>
                    );
                })}
            </div>

            <div className={styles.detailPanel}>
                {value.frequency === "weekly" && (
                    <>
                        <span className={styles.detailLabel}>
                            Repeat on
                        </span>

                        <div className={styles.weekdays}>
                            {WEEKDAYS.map((day) => {
                                const selected =
                                    value.daysOfWeek.includes(
                                        day.value
                                    );

                                return (
                                    <button
                                        key={day.value}
                                        type="button"
                                        className={[
                                            styles.day,
                                            selected
                                                ? styles.daySelected
                                                : "",
                                        ].join(" ")}
                                        onClick={() =>
                                            toggleDay(day.value)
                                        }
                                        aria-pressed={selected}
                                    >
                                        <Chip className={styles.dayChip}>
                                            {day.label}
                                        </Chip>
                                    </button>
                                );
                            })}
                        </div>

                        <div className={styles.divider} />
                    </>
                )}

                {value.frequency === "monthly" && (
                    <>
                        <div className={styles.monthly}>
                            <label>Day of month</label>

                            <div
                                className={styles.dayScroller}
                                aria-label="Select day of month"
                            >
                                <button
                                    type="button"
                                    className={styles.scrollArrow}
                                    onClick={() =>
                                        onChange?.({
                                            ...value,
                                            dayOfMonth:
                                                value.dayOfMonth <= 1
                                                    ? 31
                                                    : value.dayOfMonth - 1,
                                        })
                                    }
                                    aria-label="Previous day"
                                >
                                    <Icon
                                        name="chevron-up"
                                        variant="standard"
                                        size={12}
                                    />
                                </button>

                                <span className={styles.scrollValue}>
                                    {value.dayOfMonth}
                                </span>

                                <button
                                    type="button"
                                    className={styles.scrollArrow}
                                    onClick={() =>
                                        onChange?.({
                                            ...value,
                                            dayOfMonth:
                                                value.dayOfMonth >= 31
                                                    ? 1
                                                    : value.dayOfMonth + 1,
                                        })
                                    }
                                    aria-label="Next day"
                                >
                                    <Icon
                                        name="chevron-down"
                                        variant="standard"
                                        size={12}
                                    />
                                </button>
                            </div>

                            <span>
                                Choose a day between 1 and 31.
                            </span>
                        </div>

                        <div className={styles.divider} />
                    </>
                )}

                {renderConfirmation()}
            </div>
        </div>
    );
}