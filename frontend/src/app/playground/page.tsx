"use client";

import styles from "./playground.module.css";
import PlannerViewSwitcher from "../../components/planner/PlannerViewSwitcher";
import DailyHeader from "../../components/planner/DailyHeader";
import DailyLayout from "../../components/planner/DailyLayout";
import FocusCard from "../../components/planner/FocusCard";
import NotesCard from "../../components/planner/NotesCard";
import TimelineColumn from "../../components/planner/Timeline/TimelineColumn";
import OccurrenceCard from "../../components/planner/Timeline/OccurrenceCard";

export default function PlaygroundPage() {

  const today = new Date();
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>ORGANON V3</p>
        <h1>Component Playground</h1>
        <p>
          A temporary workshop for building and approving planner
          components before they are assembled into pages.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Daily Planner</h2>
        <div className={styles.empty}>
          <span>Components will appear here as we build them.</span>
                  <section className={styles.section}>
                      <h2>Planner View Switcher</h2>

                      <PlannerViewSwitcher />
                  </section>

                  <section className={styles.section}>
                      <h2>Daily Header</h2>

                      <DailyHeader
                          date={today}
                          onPrevious={() => console.log("Previous day")}
                          onNext={() => console.log("Next day")}
                          onToday={() => console.log("Return to today")}
                          isToday={true}
                      />
                  </section>

                  <section className={styles.section}>
                      <h2>Daily Layout</h2>

                      <DailyLayout
                          main={
                              <div
                                  style={{
                                      minHeight: "20rem",
                                      padding: "2rem",
                                      borderRadius: "1rem",
                                      background: "rgb(var(--whisper-rgb) / 0.5)",
                                  }}
                              >
                                  Main planner
                              </div>
                          }
                          sidebar={
                              <div
                                  style={{
                                      minHeight: "20rem",
                                      padding: "2rem",
                                      borderRadius: "1rem",
                                      background: "rgb(var(--whisper-rgb) / 0.5)",
                                  }}
                              >
                                  Planner sidebar
                              </div>
                          }
                      />
                  </section>

                  <section className={styles.section}>
                      <h2>Focus Card</h2>

                      <FocusCard
                          items={[
                              {
                                  id: "1",
                                  title: "Finish Organon",
                                  completed: false,
                              },
                              {
                                  id: "2",
                                  title: "Reply to email",
                                  completed: true,
                              },
                              {
                                  id: "3",
                                  title: "Buy groceries",
                                  completed: true,
                              },
                              {
                                  id: "4",
                                  title: "Call Mom",
                                  completed: false,
                              },
                          ]}
                      />

                  </section>

                  <section className={styles.section}>
                      <h2>Notes Card</h2>

                      <NotesCard />
                  </section>

                  <section className={styles.section}>
                      <h2>Timeline Column</h2>

                      <div className={styles.preview}>
                          <TimelineColumn />
                      </div>
                  </section>

                  <OccurrenceCard
                      title="Finish Organon"
                      description="Complete the Daily Planner"
                      completed={false}
                  />

                  <OccurrenceCard
                      title="Morning walk"
                      description="5,000 steps"
                      completed
                  />
        </div>
        
      </section>
    </main>
  );
}
