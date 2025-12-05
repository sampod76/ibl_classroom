/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { IFileAfterUpload } from "@/types/globalType";

const URL = "/classroom";

export const ClassroomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllClassroom: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as IClassRoom[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.Classroom],
    }),
    // get single academic department
    getSingleClassroom: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as IClassRoom,
      providesTags: [tagTypes.Classroom],
    }),

    // create a new academic department
    addClassroom: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.Classroom],
    }),
    // update ac department
    updateClassroom: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.Classroom],
    }),

    // delete ac department
    deleteClassroom: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Classroom],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddClassroomMutation,
  useDeleteClassroomMutation,
  useGetAllClassroomQuery,
  useGetSingleClassroomQuery,
  useUpdateClassroomMutation,
} = ClassroomApi;

export interface IClassRoom {
  _id: string;
  id: string;
  name: string;
  author: {
    role: string;
    userId: string;
    roleBaseUserId: string;
  };
  classRoomCategoryId: string;
  description: string;
  bannerImage: {
    url: string;
    mimetype: string;
    filename: string;
    path: string;
    cdn: string;
    platform: string;
    createdAt: string;
    updatedAt: string;
  };
  classCode: string;
  serial_number: number;
  status: "active" | "inactive";
  isDelete: "yes" | "no";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
