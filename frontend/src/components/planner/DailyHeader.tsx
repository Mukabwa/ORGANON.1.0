"use client";

import Button from "../../primitives/Button/Button";
import Icon from "../../primitives/Icon/Icon";
import styles from "../../styles/components/DailyHeader.module.css";

interface DailyHeaderProps {
    date: Date;
    onPrevious: () => void;
    onNext: () => void;
    onToday: () => void;
    isToday: boolean;
}

export default function DailyHeader({
    date,
    onPrevious,
    onNext,
    onToday,
    isToday,
}: DailyHeaderProps) {
    const weekday = date.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const fullDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <header className={styles.header}>
            <div className={styles.dateNavigation}>
                <button
                    type="button"
                    className={styles.arrowButton}
                    onClick={onPrevious}
                    aria-label="Previous day"
                >
                    <Icon
                        name="chevron-left"
                        variant="standard"
                        size={18}
                    />
                </button>

                <div className={styles.dateIdentity}>
                    <span className={styles.date}>{fullDate}</span>
                    <span className={styles.weekday}>{weekday}</span>
                </div>

                <button
                    type="button"
                    className={styles.arrowButton}
                    onClick={onNext}
                    aria-label="Next day"
                >
                    <Icon
                        name="chevron-right"
                        variant="standard"
                        size={18}
                    />
                </button>
            </div>

            {isToday ? (
                <Button
                    variant="muted"
                    type="button"
                    className={styles.todayButton}
                    disabled
                >
                    Today
                </Button>
            ) : (
                <Button
                    variant="muted"
                    type="button"
                    onClick={onToday}
                    className={styles.todayButton}
                >
                    Return to Today
                </Button>
            )}
        </header>
    );
}