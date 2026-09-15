import React from "react";
import {
  Search,
  Plus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  Calendar,
  Clock,
  Settings,
  Droplet,
  MoreHorizontal,
  AlertCircle,
  Repeat,
} from "lucide-react";
import styles from "./Icon.module.css";

type IconName =
  | "search"
  | "plus"
  | "back"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "home"
  | "calendar"
  | "clock"
  | "settings"
  | "droplet"
  | "tasks"
  | "projects"
  | "goals"
  | "routines"
  | "alert-circle"
  | "repeat"
  | "logout"
  | "more";

type IconVariant =
  | "standard"
  | "gradient"
  | "capsule";

interface IconProps {
  name: IconName;
  variant?: IconVariant;
  size?: number;
  className?: string;
}

type LocalIconProps = {
  size: number;
};

function TasksIcon({ size }: LocalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="3" height="3" rx="0.5" />
      <path d="M10 6.5h10" />
      <rect x="4" y="12" width="3" height="3" rx="0.5" />
      <path d="M10 13.5h10" />
      <path d="m4 19 2 2 3-3" />
      <path d="M10 20h10" />
    </svg>
  );
}

function ProjectsIcon({ size }: LocalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 7.5h6l2 2H20.5v9.5h-17z" />
      <path d="M3.5 7.5V5h6l2 2" />
    </svg>
  );
}

function GoalsIcon({ size }: LocalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function RoutinesIcon({ size }: LocalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7h9" />
      <path d="m13 4 3 3-3 3" />
      <path d="M17 17H8" />
      <path d="m11 14-3 3 3 3" />
    </svg>
  );
}

function LogoutIcon({ size }: LocalIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H10" />
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
    </svg>
  );
}

const lucideIcons = {
  search: Search,
  plus: Plus,
  back: ArrowLeft,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  "alert-circle": AlertCircle,
  "repeat": Repeat,
  home: Home,
  calendar: Calendar,
  clock: Clock,
  settings: Settings,
  droplet: Droplet,
  more: MoreHorizontal,
};

const localIcons = {
  tasks: TasksIcon,
  projects: ProjectsIcon,
  goals: GoalsIcon,
  routines: RoutinesIcon,
  logout: LogoutIcon,
};

export default function Icon({
  name,
  variant = "standard",
  size = 20,
  className = "",
}: IconProps) {
  const LucideIcon = lucideIcons[
    name as keyof typeof lucideIcons
  ];

  const LocalIcon = localIcons[
    name as keyof typeof localIcons
  ];

  const gradientId = `icon-gradient-${name}`;

  return (
    <span
      className={[
        styles.icon,
        styles[`icon-${variant}`],
        className,
      ].join(" ")}
    >
      {LucideIcon ? (
        <LucideIcon
          size={size}
          strokeWidth={1.8}
          stroke={
            variant === "gradient"
              ? `url(#${gradientId})`
              : "currentColor"
          }
        >
          {variant === "gradient" && (
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="var(--purple)"
                />
                <stop
                  offset="100%"
                  stopColor="var(--blush)"
                />
              </linearGradient>
            </defs>
          )}
        </LucideIcon>
      ) : LocalIcon ? (
        <LocalIcon size={size} />
      ) : null}
    </span>
  );
}