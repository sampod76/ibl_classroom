/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { IFileAfterUpload } from "@/types/globalType";

const URL = "/cr-live-tutorial";

export const LiveTutorialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllLiveTutorial: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as ILiveTutorial[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.LiveTutorial],
    }),
    // get single academic department
    getSingleLiveTutorial: build.query({
      query: (id: string | string[] | undefined) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.data as ILiveTutorial,
      providesTags: [tagTypes.LiveTutorial],
    }),

    // create a new academic department
    addLiveTutorial: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.LiveTutorial],
    }),
    // update ac department
    updateLiveTutorial: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.LiveTutorial],
    }),

    // delete ac department
    deleteLiveTutorial: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.LiveTutorial],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddLiveTutorialMutation,
  useDeleteLiveTutorialMutation,
  useGetAllLiveTutorialQuery,
  useGetSingleLiveTutorialQuery,
  useUpdateLiveTutorialMutation,
} = LiveTutorialApi;

export interface ILiveTutorial {
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
