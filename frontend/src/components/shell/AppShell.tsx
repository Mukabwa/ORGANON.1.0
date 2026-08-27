import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import styles from "./AppShell.module.css";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
  userQuote?: string;
  onLogout?: () => void;
}

export default function AppShell({
  children,
  userName,
  userQuote,
  onLogout,
}: AppShellProps) {
  return (
    <div className={styles.shell}>
      <Sidebar
        userName={userName}
        userQuote={userQuote}
        onLogout={onLogout}
      />

      <main className={styles.content}>{children}</main>

      <MobileNav />
    </div>
  );
}
