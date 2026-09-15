"use client";

import Card from "../../primitives/Card/Card";
import ProgressBar from "../../primitives/ProgressBar/ProgressBar";
import styles from "../../styles/components/FocusCard.module.css";

export interface FocusItem {
    id: string;
    title: string;
    completed: boolean;
}

interface FocusCardProps {
    items?: FocusItem[];
}

export default function FocusCard({
    items = [],
}: FocusCardProps) {
    const total = items.length;

    const completed = items.filter(
        (item) => item.completed
    ).length;

    const progress =
        total > 0
            ? (completed / total) * 100
            : 0;

    return (
        <Card
            variant="primary"
            className={styles.card}
        >
            <div className={styles.header}>
                <h2 className={styles.title}>
                    Today&apos;s Focus
                </h2>

                <div className={styles.progress}>
                    <ProgressBar
                        variant="circle"
                        value={progress}
                    />

                    <div className={styles.progressLabel}>
                        <strong>{total}</strong>

                        <span>priority</span>
                        <span>items</span>
                    </div>
                </div>
            </div>

            {items.length === 0 ? (
                <div className={styles.empty}>
                    <p className={styles.emptyTitle}>
                        Nothing competing for your attention.
                    </p>

                    <p className={styles.emptyText}>
                        Your priorities will appear here.
                    </p>
                </div>
            ) : (
                <ul className={styles.list}>
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className={[
                                styles.item,
                                item.completed
                                    ? styles.completed
                                    : "",
                            ].join(" ")}
                        >
                            <span
                                className={styles.indicator}
                                aria-hidden="true"
                            >
                                {item.completed ? " " : ""} ✓
                            </span>

                            <span className={styles.itemTitle}>
                                {item.title}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}