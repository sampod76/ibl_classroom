import { USER_ROLE } from "@/constants/role";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  success?: string;
  message?: string;
  data: any;
  meta?: IMeta;
  statusCode?: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IUserRef = {
  role: keyof typeof USER_ROLE;
  userId: string;
  roleBaseUserId: string;
};
