"use client";

import { useState } from "react";

import AppShell from "../../../components/shell/AppShell";
import PlannerViewSwitcher from "../../../components/planner/PlannerViewSwitcher";
import DailyHeader from "../../../components/planner/DailyHeader";
import DailyLayout from "../../../components/planner/DailyLayout";
import FocusCard from "../../../components/planner/FocusCard";
import NotesCard from "../../../components/planner/NotesCard";
import TimelineColumn from "../../../components/planner/Timeline/TimelineColumn";
import Button from "../../../primitives/Button/Button";

import Card from "../../../primitives/Card/Card";

import styles from "./page.module.css";

export default function DailyPlannerPage() {
    const [selectedDate, setSelectedDate] =
        useState(new Date());

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
                                <TimelineColumn />
                            </div>

                            <div
                                className={
                                    styles.addTaskArea
                                }
                            >
                                <Button
                                    variant="primary"
                                    className={styles.addTask}
                                >
                                    + Add Task
                                </Button>
                            </div>
                        </Card>
                    }

                    sidebar={
                        <>
                            <FocusCard/>

                            <NotesCard />
                        </>
                    }
                />

            </div>
        </AppShell>
    );
}