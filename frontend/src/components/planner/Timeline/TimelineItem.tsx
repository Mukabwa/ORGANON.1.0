import OccurrenceCard from "./OccurrenceCard";
import RoutineInsertionCard from "./RoutineInsertionCard";

interface TimelineItemData {
    type: "occurrence" | "routine";
    title: string;
    description?: string;
    completed?: boolean;
}

interface TimelineItemProps {
    item: TimelineItemData;
}

export default function TimelineItem({
    item,
}: TimelineItemProps) {
    if (item.type === "routine") {
        return (
            <RoutineInsertionCard
                title={item.title}
                description={item.description}
                completed={item.completed}
            />
        );
    }

    return (
        <OccurrenceCard
            title={item.title}
            description={item.description}
            completed={item.completed}
        />
    );
}