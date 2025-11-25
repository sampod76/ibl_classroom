/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { IFileAfterUpload } from "@/types/globalType";

const URL = "/cr-lecture-note";

export const LectureNoteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllLectureNote: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as ILectureNote[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.LectureNote],
    }),
    // get single academic department
    getSingleLectureNote: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as ILectureNote,
      providesTags: [tagTypes.LectureNote],
    }),

    // create a new academic department
    addLectureNote: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.LectureNote],
    }),
    // update ac department
    updateLectureNote: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.LectureNote],
    }),

    // delete ac department
    deleteLectureNote: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.LectureNote],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddLectureNoteMutation,
  useDeleteLectureNoteMutation,
  useGetAllLectureNoteQuery,
  useGetSingleLectureNoteQuery,
  useUpdateLectureNoteMutation,
} = LectureNoteApi;

interface ILectureNote {
  _id: string;
  title: string;
  description: string;
  classRoomId: string;
  crTopicId: string;
  authorId: string;
  files: IFileAfterUpload[];
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
