/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { USER_ROLE } from "@/constants/role";
export interface UserState {
  role: keyof typeof USER_ROLE;
  name: string;
  email: string;
  img?: string;
  id: string;
  roleBaseUserId?: string;
  userId?: string;
}
export interface TokenUserRole {
  data?: UserState;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const initialState: TokenUserRole = {
  // data: {},
  isLoading: true,
  isError: false,
};

export const userRoleSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserRole: (state, { payload }: { payload: TokenUserRole }) => {
      if (payload.data) {
        state.data = {
          role: payload.data.role,
          email: payload.data.email,
          name: payload.data.name,
          id: payload.data.id,
          roleBaseUserId: payload.data?.roleBaseUserId,
          userId: payload.data?.userId,
        };
      }
      if (typeof payload.isLoading !== "undefined") {
        state.isLoading = payload.isLoading;
      }
      if (typeof payload.isError !== "undefined") {
        state.isError = payload.isError;
      }
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;

// export const selectRole  =(state:RootState) =>state.

export default userRoleSlice.reducer;
