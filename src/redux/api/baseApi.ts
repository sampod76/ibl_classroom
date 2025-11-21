import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";

import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { configEnv } from "@/helpers/config/envConfig";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  //  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  baseQuery: axiosBaseQuery({ baseUrl: configEnv.API_BASE_URL }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://api.iblossomlearn.org/api/v1" }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
