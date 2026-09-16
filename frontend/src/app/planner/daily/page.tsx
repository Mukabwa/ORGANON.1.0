"use client";

import { useEffect, useState } from "react";
import AppShell from "../../../components/shell/AppShell";
import PlannerViewSwitcher from "../../../components/planner/PlannerViewSwitcher";
import DailyHeader from "../../../components/planner/DailyHeader";
import DailyLayout from "../../../components/planner/DailyLayout";
import FocusCard from "../../../components/planner/FocusCard";
import NotesCard from "../../../components/planner/NotesCard";
import TimelineColumn from "../../../components/planner/Timeline/TimelineColumn";
import AddTaskContainer from "../../../components/addtask/AddTaskContainer";
import TaskForm from "../../../components/addtask/TaskForm";
import Button from "../../../primitives/Button/Button";
import Card from "../../../primitives/Card/Card";
import styles from "./page.module.css";
import { api } from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";


export default function DailyPlannerPage() {
    const [timelineItems, setTimelineItems] =
        useState<any[]>([]);

    const [selectedDate, setSelectedDate] =
        useState(new Date());

    const [isAddTaskOpen, setIsAddTaskOpen] =
        useState(false);

    const today = new Date();

    const handlePrevious = () => {
        setSelectedDate((current) => {
            const previous = new Date(current);
            previous.setDate(
                previous.getDate() - 1
            );
            return previous;
        });
    };

    const handleNext = () => {
        setSelectedDate((current) => {
            const next = new Date(current);
            next.setDate(
                next.getDate() + 1
            );
            return next;
        });
    };

    const handleToday = () => {
        setSelectedDate(new Date());
    };

    const isToday =
        selectedDate.toDateString() ===
        today.toDateString();

    useEffect(() => {
        if (!isAddTaskOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAddTaskOpen]);

    useEffect(() => {
        if (!isAddTaskOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsAddTaskOpen(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isAddTaskOpen]);

    useEffect(() => {
        const loadTimeline = async () => {
            const token =
                localStorage.getItem("token");

            if (!token) {
                return;
            }

            const date = [
                selectedDate.getFullYear(),
                String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0"),
                String(
                    selectedDate.getDate()
                ).padStart(2, "0"),
            ].join("-");

            try {
                const data =
                    await api.get<{
                        date: string;
                        items: any[];
                    }>(
                        `/timeline/daily?date=${date}`,
                        token
                    );

                setTimelineItems(data.items);
            } catch (error) {
                console.error(
                    "Failed to load timeline:",
                    error
                );
            }
        };

        loadTimeline();
    }, [selectedDate]);

    return (
        <AppShell>
            <div className={styles.page}>
                <div className={styles.headerRow}>
                    <DailyHeader
                        date={selectedDate}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        onToday={handleToday}
                        isToday={isToday}
                    />

                    <PlannerViewSwitcher />
                </div>

                <DailyLayout
                    main={
                        <Card
                            variant="standard"
                            className={styles.timelineCard}
                        >
                            <div
                                className={
                                    styles.timelineScroll
                                }
                            >
                                <TimelineColumn
                                    items={timelineItems.map((item) => ({
                                        id: String(item.id),
                                        time: item.time,
                                        type: item.type,
                                        title: item.title,
                                        description: item.description,
                                        completed:
                                            item.status === "completed",
                                    }))}
                                />
                            </div>

                            <div
                                className={
                                    styles.addTaskArea
                                }
                            >
                                <Button
                                    variant="primary"
                                    className={
                                        styles.addTask
                                    }
                                    onClick={() =>
                                        setIsAddTaskOpen(true)
                                    }
                                >
                                    + Add Task
                                </Button>
                            </div>
                        </Card>
                    }
                    sidebar={
                        <>
                            <FocusCard />
                            <NotesCard />
                        </>
                    }
                 />

            {isAddTaskOpen && (
                <div
                    className={styles.addTaskOverlay}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Add Task"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setIsAddTaskOpen(false);
                        }
                    }}
                >
                    <div
                        className={
                            styles.addTaskDialog
                        }
                    >
                        <AddTaskContainer
                            onBack={() =>
                                setIsAddTaskOpen(false)
                            }
                            onAddTask={() => {
                                // Temporary:
                                // backend creation comes later.
                                setIsAddTaskOpen(false);
                            }}
                        >
                            <TaskForm />
                        </AddTaskContainer>
                    </div>
                </div>
            )}
        </div>
        </AppShell >
    );
}