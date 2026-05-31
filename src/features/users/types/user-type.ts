export type User = {
  id: string;
    email: string;
    password: string;
    fullName?: string | null;
    phone?: string | null;
    address?: string | null;
    avatarUrl?: string | null;
};