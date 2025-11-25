/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const URL = "/cr-student-access-classroom";

export const StudentAccessClassroomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllStudentAccessClassroom: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as IClassroomData[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.StudentAccessClassroom],
    }),
    // get single academic department
    getSingleStudentAccessClassroom: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as IClassroomData,
      providesTags: [tagTypes.StudentAccessClassroom],
    }),

    // create a new academic department
    addStudentAccessClassroom: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.StudentAccessClassroom],
    }),
    // update ac department
    updateStudentAccessClassroom: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.StudentAccessClassroom],
    }),

    // delete ac department
    deleteStudentAccessClassroom: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.StudentAccessClassroom],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddStudentAccessClassroomMutation,
  useDeleteStudentAccessClassroomMutation,
  useGetAllStudentAccessClassroomQuery,
  useGetSingleStudentAccessClassroomQuery,
  useUpdateStudentAccessClassroomMutation,
} = StudentAccessClassroomApi;

type IClassroomData = {
  _id: string;
  classRoomDetails: {
    _id: string;
    name: string;
    classRoomCategoryId: string;
    classCode: string;
    bannerImage: { url: string };
    status: string;
    createdAt: string;
  }[];
};
