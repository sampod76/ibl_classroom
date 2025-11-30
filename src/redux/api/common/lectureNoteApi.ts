/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta, IUserRef } from "@/types";
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
      providesTags: [tagTypes.LectureNote, tagTypes.Topics],
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
      providesTags: [tagTypes.LectureNote, tagTypes.Topics],
    }),

    // create a new academic department
    addLectureNote: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.LectureNote, tagTypes.Topics],
    }),
    // update ac department
    updateLectureNote: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.LectureNote, tagTypes.Topics],
    }),

    // delete ac department
    deleteLectureNote: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.LectureNote, tagTypes.Topics],
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

export interface ILectureNote {
  _id: string;
  title: string;
  description: string;
  classRoomId: string;
  crTopicId: string;
  author: IUserRef;
  files: IFileAfterUpload[];
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
