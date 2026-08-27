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

const demoItems: TimelineColumnItem[] = [
    {
        id: "1",
        time: "9:00 AM",
        type: "occurrence",
        title: "Finish Organon",
        description: "Complete the Daily Planner",
    },
    {
        id: "2",
        time: "10:30 AM",
        type: "routine",
        title: "Morning Routine",
        description: "Start the day",
    },
    {
        id: "3",
        time: "12:00 PM",
        type: "occurrence",
        title: "Buy groceries",
    },
    {
        id: "4",
        time: "2:00 PM",
        type: "routine",
        title: "Study Session",
        description: "Deep work",
    },
];

export default function TimelineColumn({
    items = demoItems,
}: TimelineColumnProps) {
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