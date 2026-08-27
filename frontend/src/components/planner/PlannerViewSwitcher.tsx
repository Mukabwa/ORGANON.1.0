"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../styles/components/PlannerViewSwitcher.module.css";

const views = [
    {
        label: "Day",
        href: "/planner/daily",
    },
    {
        label: "Week",
        href: "/planner/weekly",
    },
    {
        label: "Month",
        href: "/planner/monthly",
    },
] as const;

export default function PlannerViewSwitcher() {
    const pathname = usePathname();

    return (
        <nav
            className={styles.switcher}
            aria-label="Planner view"
        >
            {views.map((view, index) => {
                const active = pathname === view.href;

                return (
                    <Link
                        key={view.href}
                        href={view.href}
                        className={[
                            styles.segment,
                            active ? styles.active : "",
                            index < views.length - 1
                                ? styles.withDivider
                                : "",
                        ].join(" ")}
                        aria-current={active ? "page" : undefined}
                    >
                        {view.label}
                    </Link>
                );
            })}
        </nav>
    );
}