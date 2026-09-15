"use client";

import Icon from "../../primitives/Icon/Icon";
import styles from "../../styles/components/addtask/AddTaskHeader.module.css";

interface AddTaskHeaderProps {
    title?: string;
    onBack?: () => void;
}

export default function AddTaskHeader({
    title = "Add Task",
    onBack,
}: AddTaskHeaderProps) {
    return (
        <header className={styles.header}>
            <button
                type="button"
                onClick={onBack}
                className={styles.backButton}
                aria-label="Go back"
            >
                <Icon
                    name="chevron-left"
                    variant="standard"
                    size={16}
                />
                <span>Back</span>
            </button>
        </header>
    );
}