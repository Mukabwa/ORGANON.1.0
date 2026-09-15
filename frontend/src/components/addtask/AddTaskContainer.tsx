"use client";

import React from "react";
import Card from "../../primitives/Card/Card";
import Button from "../../primitives/Button/Button";
import Icon from "../../primitives/Icon/Icon";
import AddTaskHeader from "./AddTaskHeader";
import styles from "../../styles/components/addtask/AddTaskContainer.module.css";

interface AddTaskContainerProps {
    children?: React.ReactNode;
    onAddTask?: () => void;
    onBack?: () => void;
    title?: string;
}

export default function AddTaskContainer({
    children,
    onAddTask,
    onBack,
    title = "Add Task",
}: AddTaskContainerProps) {
    return (
        <Card variant="primary" className={styles.container}>
            <AddTaskHeader
                title={title}
                onBack={onBack}
            />

            <div className={styles.content}>
                {children}
            </div>

            <div className={styles.actionArea}>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={onAddTask}
                    className={styles.addTaskButton}
                >
                    <Icon
                        name="plus"
                        variant="standard"
                        size={18}
                    />
                    <span>Create Task</span>
                </Button>
            </div>
        </Card>
    );
}