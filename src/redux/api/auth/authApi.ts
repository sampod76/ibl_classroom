/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: loginData,
      }),

      invalidatesTags: [tagTypes.LoginHistory],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    userLogOut: build.mutation({
      query: ({ id }) => ({
        url: `${AUTH_URL}/log-out-history/${id}`,
        method: "POST",
        body: {},
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.LoginHistory],
    }),
    getProfile: build.query({
      query: () => ({
        url: `${AUTH_URL}/profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateRole: build.mutation({
      query: (data: { id: string; body: Record<string, any> }) => ({
        url: `/users/update-role/${data.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUserLoginMutation,
  useGetProfileQuery,
  useUpdateRoleMutation,
  useForgetPasswordMutation,
  useUserLogOutMutation,
  useResetPasswordMutation,
  //
  useChangePasswordMutation,
} = authApi;
