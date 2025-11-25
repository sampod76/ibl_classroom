/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const URL = "/cr-topics";

export const TopicsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllTopics: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as Root[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.Topics],
    }),
    // get single academic department
    getSingleTopics: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as Root,
      providesTags: [tagTypes.Topics],
    }),

    // create a new academic department
    addTopics: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.Topics],
    }),
    // update ac department
    updateTopics: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.Topics],
    }),

    // delete ac department
    deleteTopics: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.Topics],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddTopicsMutation,
  useDeleteTopicsMutation,
  useGetAllTopicsQuery,
  useGetSingleTopicsQuery,
  useUpdateTopicsMutation,
} = TopicsApi;

export interface Root {
  _id: string;
  title: string;
  authorId: string;
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
