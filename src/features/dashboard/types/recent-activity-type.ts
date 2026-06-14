import type { ActivityType } from "../constants/activity";

export type RecentActivityItem = {
  type: (typeof ActivityType)[keyof typeof ActivityType];
  title: string;
  message: string;
  date: string;
};
