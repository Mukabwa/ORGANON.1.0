"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Card from "../../primitives/Card/Card";
import Icon from "../../primitives/Icon/Icon";
import styles from "./MobileNav.module.css";

const links = [
  { label: "Planner", href: "/planner/daily", icon: "calendar" },
  { label: "Tasks", href: "/tasks", icon: "tasks" },
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Goals", href: "/goals", icon: "goals" },
  { label: "Routines", href: "/routines", icon: "routines" },
] as const;

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/planner/daily"
      ? pathname.startsWith("/planner")
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className={styles.mobileNav} aria-label="Primary navigation">
      {links.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? "active" : undefined}
            aria-label={link.label}
            aria-current={active ? "page" : undefined}
          >
            <Card variant="secondary">
              <Icon name={link.icon} variant="standard" size={18} />
            </Card>
          </Link>
        );
      })}
    </nav>
  );
}
