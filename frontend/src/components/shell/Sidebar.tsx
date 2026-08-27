"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../../primitives/Button/Button";
import Card from "../../primitives/Card/Card";
import Icon from "../../primitives/Icon/Icon";
import styles from "./Sidebar.module.css";
import Divider from "../../primitives/Divider/Divider";

interface SidebarProps {
  userName?: string;
  userQuote?: string;
  onLogout?: () => void;
}

const links = [
  { label: "Planner", href: "/planner/daily", icon: "calendar" },
  { label: "Tasks", href: "/tasks", icon: "tasks" },
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Goals", href: "/goals", icon: "goals" },
  { label: "Routines", href: "/routines", icon: "routines" },
] as const;

export default function Sidebar({
  userName = "User",
  userQuote = "A little progress is still progress.",
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/planner/daily"
      ? pathname.startsWith("/planner")
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.identity}>
        <div className={styles.wordmark}>Organon</div>

        <p className={styles.tagline}>
          A gentle place for your plans
        </p>

        <Divider
          variant="fade"
          className={styles.identityDivider}
        />
      </div>

      <nav className={styles.navigation} aria-label="Primary navigation">
        {links.map((link) => {
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                styles.navLink,
                active ? styles.active : "",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span className={styles.navContent}>
                <Icon
                  name={link.icon}
                  variant="standard"
                  size={19}
                />
                <span>{link.label}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.userArea}>
        <div className={styles.userIdentity}>
          <strong>{userName}</strong>
          <span>“{userQuote}”</span>
        </div>

        <Divider
          variant="fade"
          className={styles.userDivider}
        />

        <Button
          variant="primary"
          type="button"
          onClick={onLogout}
          className={styles.logout}
        >
          <Icon name="logout" variant="standard" size={17} />
          <span>Log out</span>
        </Button>
      </div>
    </aside>
  );
}
