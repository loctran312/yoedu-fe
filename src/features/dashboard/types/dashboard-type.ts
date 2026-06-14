import type { RecentActivityItem } from "./recent-activity-type";
import type { Stat } from "./stat-data-type";
import type { TodayClassesItem } from "./today-classes-type";

export type Dashboard = {
    statData: Stat[];
    recentActivityData: RecentActivityItem[];
    todayClasses: TodayClassesItem[];
};