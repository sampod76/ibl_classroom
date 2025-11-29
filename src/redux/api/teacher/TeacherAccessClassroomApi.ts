/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const URL = "/cr-teacher-access-classroom";

export const TeacherAccessClassroomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllTeacherAccessClassroom: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      /*************  ✨ Windsurf Command ⭐  *************/
      /*******  5117fb5c-efb4-47d1-aa45-f4296f6fb1bd  *******/
      transformResponse: (response: any) => {
        return {
          data: response.data as IClassroomData[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.TeacherAccessClassroom],
    }),
    // get single academic department
    getSingleTeacherAccessClassroom: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as IClassroomData,
      providesTags: [tagTypes.TeacherAccessClassroom],
    }),

    // create a new academic department
    addTeacherAccessClassroom: build.mutation({
      query: (data: Record<string, any>) => {
        return {
          url: URL,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.TeacherAccessClassroom],
    }),
    // update ac department
    updateTeacherAccessClassroom: build.mutation({
      query: ({ data, id }: { data: Record<string, any>; id: string }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.TeacherAccessClassroom],
    }),

    // delete ac department
    deleteTeacherAccessClassroom: build.mutation({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.TeacherAccessClassroom],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddTeacherAccessClassroomMutation,
  useDeleteTeacherAccessClassroomMutation,
  useGetAllTeacherAccessClassroomQuery,
  useGetSingleTeacherAccessClassroomQuery,
  useUpdateTeacherAccessClassroomMutation,
} = TeacherAccessClassroomApi;

type IClassroomData = {
  _id: string;
  classRoomDetails: {
    _id: string;
    name: string;
    classRoomCategoryId: string;
    description: string;
    classCode: string;
    bannerImage: { url: string };
    status: string;
    createdAt: string;
  }[];
};
