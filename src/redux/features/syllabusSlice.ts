/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFileAfterUpload } from "@/types/globalType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubject } from "../api/common/subjectApi";

const initialState: {
  subject: ISubject | Record<string, any>;
} = {
  subject: {},
};

const syllabusSlice = createSlice({
  name: "syllabusesState",
  initialState,
  reducers: {
    addSubject: (state, action: PayloadAction<ISubject>) => {
      state.subject = action.payload;
    },
  },
});

export const { addSubject } = syllabusSlice.actions;

export default syllabusSlice.reducer;
