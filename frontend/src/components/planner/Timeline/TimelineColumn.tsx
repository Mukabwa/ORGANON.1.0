import Icon from "../../../primitives/Icon/Icon";
import styles from "./TimelineColumn.module.css";
import TimelineItem from "./TimelineItem";

interface TimelineColumnItem {
    id: string;
    time: string;
    type: "occurrence" | "routine";
    title: string;
    description?: string;
    completed?: boolean;
}

interface TimelineColumnProps {
    items?: TimelineColumnItem[];
}

export default function TimelineColumn({
    items = [],
}: TimelineColumnProps) {
    if (items.length === 0) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyTitle}>
                    Your day is open.
                </p>

                <p className={styles.emptyText}>
                    Add a task to begin planning.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.timeline}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={styles.row}
                >
                    <div className={styles.time}>
                        {item.time}
                    </div>

                    <div className={styles.marker}>
                        <span className={styles.markerDot}>
                            <Icon
                                name="plus"
                                size={10}
                            />
                        </span>
                    </div>

                    <div className={styles.item}>
                        <TimelineItem item={item} />
                    </div>
                </div>
            ))}
        </div>
    );
}