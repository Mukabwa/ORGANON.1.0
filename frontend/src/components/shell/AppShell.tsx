"use client";

import React from "react";

import { useRouter } from "next/navigation";

import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

import { useAuth } from "../../context/AuthContext";

import styles from "./AppShell.module.css";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  const [displayName, setDisplayName] =
    React.useState(user?.name ?? "User");

  React.useEffect(() => {
    if (user?.name) {
      setDisplayName(user.name);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={styles.shell}>
      <Sidebar
        userName={displayName}
        onLogout={handleLogout}
      />

      <main className={styles.content}>
        <div
          className={styles.profileSection}
          aria-hidden="true"
        />

        {children}
      </main>

      <MobileNav />
    </div>
  );
}