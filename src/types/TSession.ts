import { USER_ROLE } from "@/constants/role";

export type TSession = {
  isAuth: boolean;
  user: SessionUser | null;
};

export type SessionUser = {
  role: keyof typeof USER_ROLE;
  name: string;
  email: string;
  img?: string;
  id: string;
  roleBaseUserId?: string;
  userId?: string;
  exp: number;
  iat: number;
};
