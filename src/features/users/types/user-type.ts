import type { UserRole } from "./user-role-type";
import type { UserStatusType } from "./user-status-type";

export type User = {
  id: string;
  email: string;
  password: string;
  fullName?: string | null;
  phone?: string | null;
  address?: string | null;
  avatarUrl?: string | null;
  dateOfBirth?: string | null;
  role: UserRole;
  status: UserStatusType;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  student?: null;
  teacher?: null;
  parent?: null;
};