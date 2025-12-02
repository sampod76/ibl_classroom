/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const URL = "/cr-assignment";

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
          data: response.data as IAssignment[],
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
      transformResponse: (response: any) => response.data as IAssignment,
      providesTags: [tagTypes.assignment],
    }),

    // create a new academic department
    addAssignmentClassroom: build.mutation({
      query: (data) => {
        return {
          url: URL,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.assignment, tagTypes.Topics],
    }),
    // update ac department
    updateAssignmentClassroom: build.mutation({
      query: ({ data, id }: { data: any; id: string }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.assignment, tagTypes.Topics],
    }),

    // delete ac department
    deleteAssignmentClassroom: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.assignment, tagTypes.Topics],
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

export interface IAssignment {
  _id: string;
  title: string;
  author: Author;
  classRoomId: string;
  subjectId: string;
  topicId: string;
  totalMark: number;
  passMark: number;
  startDate: string;
  endDate: string;
  instructions: Instruction[];
  attachments: Attachment[];
  serial_number: number;
  status: string;
  isDelete: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Author {
  role: string;
  userId: string;
  roleBaseUserId: string;
}

interface Instruction {
  title: string;
  _id: string;
}

interface Attachment {
  url: string;
  mimetype: string;
  filename: string;
  path: string;
  cdn: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}
