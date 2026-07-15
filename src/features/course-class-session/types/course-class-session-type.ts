export interface CourseClassSession {
  id: string;
  courseId: string;
  courseName: string;
  courseClassId: string;
  courseClassName: string;
  scheduleSlotId: string;
  scheduleSlotName: string;
  mainTeacherId: string;
  mainTeacherName: string;
  assistantTeacherId: string | null;
  assistantTeacherName: string | null;
  startTime: string;
  endTime: string;
  status: CourseClassSessionStatusType;
  statusText: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export const CourseClassSessionStatus = {
  SCHEDULED: 'SCHEDULED',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED',
  RESCHEDULED: 'RESCHEDULED',
} as const;

export type CourseClassSessionStatusType =
  (typeof CourseClassSessionStatus)[keyof typeof CourseClassSessionStatus];
