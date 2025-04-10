"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, Globe, Users, BarChart, BookOpen, BarChart2, Bell } from "lucide-react";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

export const uniSightsFeatures: BentoItem[] = [
  {
    title: "Smart Course Recommendations",
    meta: "AI-Powered",
    description:
      "Get personalized course suggestions based on your academic history, interests, and peer success patterns. Our AI analyzes thousands of data points to guide your ideal schedule.",
    icon: <BookOpen className="h-4 w-4 text-blue-500" />,
    status: "Live",
    tags: ["Academic Planning", "AI", "Personalization"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Event Attendance Predictions",
    meta: "87% Accuracy",
    description:
      "See which campus events will be most popular before they happen. Our algorithms analyze historical turnout, student interests, and timing to forecast engagement.",
    icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
    status: "Beta",
    tags: ["Social", "Predictive Analytics", "Campus Life"],
  },
  {
    title: "Unified Academic Dashboard",
    meta: "All-In-One View",
    description:
      "Aggregate your classes, assignments, events, and campus resources into a single intuitive interface. No more switching between 10 different portals!",
    icon: <BarChart2 className="h-4 w-4 text-purple-500" />,
    tags: ["Productivity", "Organization", "Student Tools"],
    colSpan: 2,
  },
  {
    title: "Smart Notifications",
    meta: "Context-Aware",
    description:
      "Receive alerts tailored to your schedule and habits. Get reminders when you're near relevant locations, or when friends are attending events you might enjoy.",
    icon: <Bell className="h-4 w-4 text-amber-500" />,
    status: "Coming Soon",
    tags: ["Notifications", "AI", "Time Management"],
  },
];

const Features = () => (
  <section id="features" className="space-y-4">
    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
      <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
        Features
      </h2>
      <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Our starter project is built using a modern tech stack that includes the
        latest frameworks and tools to ensure a robust foundation for your
        application.
      </p>
    </div>
    <BentoGrid items={uniSightsFeatures} />
  </section>
);

const BentoGrid = ({ items }: BentoGridProps) => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 p-4 md:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative overflow-hidden rounded-xl p-4 transition-all duration-300",
            "border",
            "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
            "will-change-transform hover:-translate-y-0.5",
            item.colSpan ?? "col-span-1",
            item.colSpan === 2 ? "md:col-span-2" : "",
            {
              "-translate-y-0.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]":
                item.hasPersistentHover,
              "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]":
                item.hasPersistentHover,
            },
          )}
        >
          <div
            className={`absolute inset-0 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:4px_4px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 transition-all duration-300 group-hover:bg-gradient-to-br dark:bg-white/10">
                {item.icon}
              </div>
              <span
                className={cn(
                  "rounded-lg px-2 py-1 text-xs font-medium backdrop-blur-sm",
                  "bg-black/5 text-muted-foreground dark:bg-white/10",
                  "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20",
                )}
              >
                {item.status ?? "Active"}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-[15px] font-medium tracking-tight">
                {item.title}
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  {item.meta}
                </span>
              </h3>
              <p className="text-sm font-[425] leading-snug text-muted-foreground">
                {item.description}
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-black/5 px-2 py-1 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-transparent via-gray-100/50 to-transparent p-px dark:via-white/10 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  );
};

export default Features;
