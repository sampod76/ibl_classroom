/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const URL = "/classroom";

export const ClassRoomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllClassRoom: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as IClassroom[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.assignment],
    }),
    // get single academic department
    getSingleClassRoom: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as IClassroom,
      providesTags: [tagTypes.assignment],
    }),

    // create a new academic department
    addClassRoom: build.mutation({
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
    updateClassRoom: build.mutation({
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
    deleteClassRoom: build.mutation({
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
  useAddClassRoomMutation,
  useDeleteClassRoomMutation,
  useGetAllClassRoomQuery,
  useGetSingleClassRoomQuery,
  useUpdateClassRoomMutation,
} = ClassRoomApi;

export interface IClassroom {
  _id: string;
  name: string;
  authorId: string;
  serial_number: number;
  status: string;
  classCode: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
