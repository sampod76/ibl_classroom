import { baseApi } from "./api/baseApi";

import modalSlice from "./features/modalState";

import userRoleSlice from "./features/user/userRoleSlice";
import syllabusSlice from "./features/syllabusSlice";
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,

  userInfo: userRoleSlice,
  syllabus: syllabusSlice,
  modal: modalSlice,
};
