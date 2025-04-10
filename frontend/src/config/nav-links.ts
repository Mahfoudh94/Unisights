import type { AdminNavItem } from "@/types";

export const mainLinks = [
  { title: "Home", href: "/" },
  { title: "About us", href: "/about" },
  { title: "Contact us", href: "/contact" },
];

export const legalLinks = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];



export const adminNavItems: AdminNavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "users",
    label: "user",
  },
  {
    title: "Tasks",
    href: "/admin/tasks",
    icon: "tasks",
    label: "tasks",
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/admin/kanban",
    icon: "kanban",
    label: "kanban",
  },
];
