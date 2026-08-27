import type { ReactNode } from "react";
import styles from "../../styles/components/DailyLayout.module.css";

interface DailyLayoutProps {
    main: ReactNode;
    sidebar: ReactNode;
}

export default function DailyLayout({
    main,
    sidebar,
}: DailyLayoutProps) {
    return (
        <div className={styles.layout}>
            <section className={styles.main}>
                {main}
            </section>

            <aside className={styles.sidebar}>
                {sidebar}
            </aside>
        </div>
    );
}