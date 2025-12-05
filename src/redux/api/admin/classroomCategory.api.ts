/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { IFileAfterUpload } from "@/types/globalType";

const URL = "/classroom-category";

export const ClassRoomCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllClassRoomCategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as IClassRoomCategory[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.ClassRoomCategory],
    }),
    // get single academic department
    getSingleClassRoomCategory: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as IClassRoomCategory,
      providesTags: [tagTypes.ClassRoomCategory],
    }),

    // create a new academic department
    addClassRoomCategory: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.ClassRoomCategory],
    }),
    // update ac department
    updateClassRoomCategory: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.ClassRoomCategory],
    }),

    // delete ac department
    deleteClassRoomCategory: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ClassRoomCategory],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddClassRoomCategoryMutation,
  useDeleteClassRoomCategoryMutation,
  useGetAllClassRoomCategoryQuery,
  useGetSingleClassRoomCategoryQuery,
  useUpdateClassRoomCategoryMutation,
} = ClassRoomCategoryApi;

export interface IClassRoomCategory {
  _id: string;
  title: string;
  thumbnail: IFileAfterUpload;
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
