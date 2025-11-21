import { baseApi } from "./api/baseApi";

import modalSlice from "./features/modalState";

import userRoleSlice from "./features/user/userRoleSlice";
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,

  userInfo: userRoleSlice,

  modal: modalSlice,
};
