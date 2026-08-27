import Icon from "../../../primitives/Icon/Icon";
import styles from "./RoutineInsertionCard.module.css";

interface RoutineInsertionCardProps {
    title: string;
    description?: string;
    completed?: boolean;
}

export default function RoutineInsertionCard({
    title,
    description,
    completed = false,
}: RoutineInsertionCardProps) {
    return (
        <div
            className={[
                styles.card,
                completed ? styles.completed : "",
            ].join(" ")}
        >
            <div className={styles.icon}>
                <Icon
                    name="routines"
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