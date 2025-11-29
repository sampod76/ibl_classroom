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
          data: response.data as ITopis[],
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
      transformResponse: (response: any) => response.data as ITopis,
      providesTags: [tagTypes.Topics],
    }),

    // create a new academic department
    addTopics: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          body: data,
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
          body: data,
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

export interface ITopis {
  _id: string;
  title: string;
  author: Author;
  classRoomId: string;
  subjectId: string;
  objective: Objective[];
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lectureNotes: LectureNote[];
  liveTutorials: LiveTutorial[];
}

interface Author {
  role: string;
  userId: string;
  roleBaseUserId: string;
}

interface Objective {
  title: string;
  _id: string;
}

interface LectureNote {
  _id: string;
  title: string;
  description: string;
  classRoomId: string;
  subjectId: string;
  topicId: string;
  author: Author2;
  files: File[];
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Author2 {
  role: string;
  userId: string;
  roleBaseUserId: string;
}

interface File {
  url: string;
  mimetype: string;
  filename: string;
  path: string;
  cdn: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}

interface LiveTutorial {
  _id: string;
  title: string;
  subjectId: string;
  startDate: string;
  meetingDetails: MeetingDetails;
  recordingDetails: MeetingDetails;
  files: File2[];
  duration: number;
  description: string;
  classRoomId: string;
  topicId: string;
  author: Author3;
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MeetingDetails {
  link: string;
}

interface File2 {
  url: string;
  mimetype: string;
  filename: string;
  path: string;
  cdn: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}

interface Author3 {
  role: string;
  userId: string;
  roleBaseUserId: string;
}
