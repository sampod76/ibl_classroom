/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const URL = "/cr-teacher-access-classroom";

export const AssignmentClassroomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllAssignmentClassroom: build.query({
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
      providesTags: [tagTypes.assignment],
    }),
    // get single academic department
    getSingleAssignmentClassroom: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as IClassroomData,
      providesTags: [tagTypes.assignment],
    }),

    // create a new academic department
    addAssignmentClassroom: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.assignment],
    }),
    // update ac department
    updateAssignmentClassroom: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.assignment],
    }),

    // delete ac department
    deleteAssignmentClassroom: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.assignment],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddAssignmentClassroomMutation,
  useDeleteAssignmentClassroomMutation,
  useGetAllAssignmentClassroomQuery,
  useGetSingleAssignmentClassroomQuery,
  useUpdateAssignmentClassroomMutation,
} = AssignmentClassroomApi;

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
