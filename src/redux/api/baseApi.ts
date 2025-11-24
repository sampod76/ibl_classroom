/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { configEnv } from "@/helpers/config/envConfig";
import { logout, setUserRole } from "../features/user/userRoleSlice";
import { RootState } from "../store";
import { signoutSession } from "@/lib/auth_server";

const baseQuery = fetchBaseQuery({
  baseUrl: configEnv.API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userInfo?.data?.accessToken;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});
// Define a service using a base URL and expected endpoints
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status !== 401) {
    //@ts-ignore
    toast.error(result?.error?.data?.message);
  }
  // if (result?.error?.status === 403) {
  //   toast.error(result?.error?.data.message);
  // }
  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");

    const res = await fetch(`${configEnv.API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).userInfo?.data;

      api.dispatch(
        setUserRole({
          data: {
            accessToken: data?.data?.accessToken,
            role: user?.role as any,
            roleBaseUserId: user?.roleBaseUserId,
            userId: user?.userId,
            id: user?.id as any,
            email: user?.email as any,
            name: user?.name as any,
            exp: user?.exp as any,
            iat: user?.iat as any,
          },
          isLoading: false,
          isError: false,
          isLogout: false,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      await signoutSession();
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  //  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  baseQuery: baseQueryWithRefreshToken,
  // baseQuery: fetchBaseQuery({ baseUrl: "http://api.iblossomlearn.org/api/v1" }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
