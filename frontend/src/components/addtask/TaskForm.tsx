"use client";

import { useState } from "react";

import Input from "../../primitives/Input/Input";

import TimePicker from "./TimePicker";

import PrioritySelector from "./PrioritySelector";

import RecurrenceSelector, {
    RecurrenceValue,
} from "./RecurrenceSelector";

import styles from "../../styles/components/addtask/TaskForm.module.css";

type Priority = "low" | "medium" | "high";

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

function getTimeOfDay(hour: number, period: string) {
    let hour24 = hour;

    if (period === "AM" && hour === 12) {
        hour24 = 0;
    }

    if (period === "PM" && hour !== 12) {
        hour24 += 12;
    }

    if (hour24 < 5) {
        return "in the early morning";
    }

    if (hour24 < 12) {
        return "in the morning";
    }

    if (hour24 < 17) {
        return "in the afternoon";
    }

    if (hour24 < 21) {
        return "in the evening";
    }

    return "at night";
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

    return `${getOrdinal(day)} ${monthName}, ${year}`;
}

export default function TaskForm() {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [date, setDate] = useState("");

    const [time, setTime] = useState("09:00 AM");

    const [priority, setPriority] =
        useState<Priority>("medium");

    const [recurrence, setRecurrence] =
        useState<RecurrenceValue>({
            frequency: "once",
            daysOfWeek: [],
            dayOfMonth: 1,
        });

    const formattedDate = formatTaskDate(date);

    const timeMatch = time.match(
        /^(\d{2}):(\d{2})\s?(AM|PM)$/i
    );

    const confirmation =
        formattedDate && timeMatch
            ? `A task for ${formattedDate} at ${Number(
                timeMatch[1]
            )}:${timeMatch[2]} ${getTimeOfDay(
                Number(timeMatch[1]),
                timeMatch[3].toUpperCase()
            )} (${time}).`
            : "";

    return (
        <form className={styles.form}>
            <div
                className={`${styles.field} ${styles.textField}`}
            >
                <label htmlFor="task-title">
                    Title <span>*</span>
                </label>

                <Input
                    id="task-title"
                    name="title"
                    type="text"
                    variant="standard"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    required
                />
            </div>

            <div
                className={`${styles.field} ${styles.textField}`}
            >
                <label htmlFor="task-description">
                    Description
                </label>

                <div className={styles.descriptionField}>
                    <textarea
                        id="task-description"
                        name="description"
                        placeholder="Add notes, details or reminders..."
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        maxLength={300}
                    />

                    <span className={styles.characterCount}>
                        {description.length}/300
                    </span>
                </div>
            </div>

            <div className={styles.dateTimeRow}>
                <div className={styles.field}>
                    <label htmlFor="task-date">
                        Date <span>*</span>
                    </label>

                    <Input
                        id="task-date"
                        name="date"
                        type="date"
                        variant="standard"
                        value={date}
                        onChange={(event) =>
                            setDate(event.target.value)
                        }
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label>
                        Time <span>*</span>
                    </label>

                    <TimePicker
                        value={time}
                        onChange={setTime}
                    />
                </div>
            </div>

            {confirmation && (
                <p className={styles.dateTimeConfirmation}>
                    {confirmation}
                </p>
            )}

            <div className={styles.field}>
                <label>Priority</label>

                <PrioritySelector
                    value={priority}
                    onChange={setPriority}
                />
            </div>

            <div className={styles.field}>
                <label>Recurrence</label>

                <RecurrenceSelector
                    value={recurrence}
                    onChange={setRecurrence}
                    date={date}
                />
            </div>
        </form>
    );
}