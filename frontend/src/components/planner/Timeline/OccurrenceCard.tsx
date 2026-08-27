import Icon from "../../../primitives/Icon/Icon";
import styles from "./OccurrenceCard.module.css";

interface OccurrenceCardProps {
    title: string;
    description?: string;
    completed?: boolean;
}

export default function OccurrenceCard({
    title,
    description,
    completed = false,
}: OccurrenceCardProps) {
    return (
        <div
            className={[
                styles.card,
                completed ? styles.completed : "",
            ].join(" ")}
        >
            <div className={styles.icon}>
                <Icon
                    name="tasks"
                    size={18}
                />
            </div>

            <div className={styles.content}>
                <span className={styles.title}>
                    {title}
                </span>

                {description && (
                    <span className={styles.description}>
                        {description}
                    </span>
                )}
            </div>

            <div className={styles.options}>
                <Icon
                    name="more"
                    size={18}
                />
            </div>
        </div>
    );
}