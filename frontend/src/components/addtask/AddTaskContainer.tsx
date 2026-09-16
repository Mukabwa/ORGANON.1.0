"use client";

import React from "react";

import Card from "../../primitives/Card/Card";

import Button from "../../primitives/Button/Button";

import Icon from "../../primitives/Icon/Icon";

import AddTaskHeader from "./AddTaskHeader";

import { api } from "../../lib/api";

import { useAuth } from "../../context/AuthContext";

import {
    TaskFormData,
} from "./TaskForm";

import styles from "../../styles/components/addtask/AddTaskContainer.module.css";

interface AddTaskContainerProps {
    children?: React.ReactNode;
    onAddTask?: (task: TaskFormData) => void;
    onBack?: () => void;
    title?: string;
}

export default function AddTaskContainer({
    children,
    onAddTask,
    onBack,
    title = "Add Task",
}: AddTaskContainerProps) {
    const { user } = useAuth();

    const [submitting, setSubmitting] =
        React.useState(false);

    const [error, setError] =
        React.useState("");

    const handleSubmit = async (
        task: TaskFormData
    ) => {
        setError("");

        const token =
            localStorage.getItem("token");

        if (!token) {
            setError(
                "You need to be logged in to create a task."
            );
            return;
        }

        if (!user) {
            setError(
                "Your account is still loading."
            );
            return;
        }

        try {
            setSubmitting(true);

            const isRecurring =
                task.recurrence.frequency !== "once";

            const payload = {
                kind: "task",

                title: task.title,

                description:
                    task.description,

                scheduling: {
                    type:
                        isRecurring
                            ? "recurring"
                            : "once",

                    localDate:
                        task.date,

                    timezone:
                        user.timezone,

                    time:
                        task.time,

                    ...(isRecurring && {
                        recurrenceRule: {
                            frequency:
                                task.recurrence
                                    .frequency,

                            interval: 1,

                            ...(task.recurrence
                                .frequency ===
                                "weekly" && {
                                daysOfWeek:
                                    task.recurrence
                                        .daysOfWeek,
                            }),

                            ...(task.recurrence
                                .frequency ===
                                "monthly" && {
                                dayOfMonth:
                                    task.recurrence
                                        .dayOfMonth,
                            }),

                            startDate:
                                task.date,
                        },
                    }),
                },

                metadata: {
                    priority:
                        task.priority,
                },
            };

            const createdTask =
                await api.post(
                    "/definitions",
                    payload,
                    token
                );

            console.log(
                "TASK CREATED",
                createdTask
            );

            onAddTask?.(task);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const form =
        React.Children.only(children);

    const connectedForm =
        React.isValidElement(form)
            ? React.cloneElement(
                form,
                {
                    onSubmit:
                        handleSubmit,
                } as Record<string, unknown>
            )
            : form;

    return (
        <Card
            variant="primary"
            className={styles.container}
        >
            <AddTaskHeader
                title={title}
                onBack={onBack}
            />

            <div className={styles.content}>
                {connectedForm}

                {error && (
                    <p>
                        {error}
                    </p>
                )}
            </div>

            <div
                className={
                    styles.actionArea
                }
            >
                <Button
                    variant="secondary"
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                        const formElement =
                            document.querySelector(
                                `.${styles.content} form`
                            ) as
                            | HTMLFormElement
                            | null;

                        formElement?.requestSubmit();
                    }}
                    className={
                        styles.addTaskButton
                    }
                >
                    <Icon
                        name="plus"
                        variant="standard"
                        size={18}
                    />

                    <span>
                        {submitting
                            ? "Creating..."
                            : "Create Task"}
                    </span>
                </Button>
            </div>
        </Card>
    );
}