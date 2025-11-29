/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta, IUserRef } from "@/types";
import { baseApi } from "../baseApi";
import { IFileAfterUpload } from "@/types/globalType";

const URL = "/cr-subjects";

export const SubjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllSubject: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as ISubject[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.Subject],
    }),
    getAllAccessSubjectByTeacher: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL + `/access/teacher`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as ISubject[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.Subject],
    }),
    // get single academic department
    getSingleSubject: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as ISubject,
      providesTags: [tagTypes.Subject],
    }),

    // create a new academic department
    addSubject: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.Subject],
    }),
    addAccessSubjectByTeacher: build.mutation({
      query: (data) => {
        return {
          url: URL + `/access/teacher`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.Subject],
    }),
    // update ac department
    updateSubject: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.Subject],
    }),

    // delete ac department
    deleteSubject: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Subject],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useGetAllSubjectQuery,
  useGetSingleSubjectQuery,
  useUpdateSubjectMutation,
  useAddAccessSubjectByTeacherMutation,
  useGetAllAccessSubjectByTeacherQuery,
} = SubjectApi;

export interface ISubject {
  _id: string;
  searchText: string;
  title: string;
  code: string;
  classRoomId: string;
  subjectDetails: {
    _id: string;
    title: string;
  }[];
  __v: number;
}
