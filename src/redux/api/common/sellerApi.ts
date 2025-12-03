/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMeta } from "@/types";
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const URL = "/seller";

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addSellerWithFormData: build.mutation({
      query: (data) => {
        //
        return {
          url: "/users/create-seller",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.seller, tagTypes.user],
    }),
    getAllSellers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data as ISeller[],
          meta: response.meta as IMeta,
        };
      },
      providesTags: [tagTypes.seller, tagTypes.user],
    }),
    getSingleSeller: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data as ISeller,
      providesTags: [tagTypes.seller, tagTypes.user],
    }),
    updateSeller: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.seller, tagTypes.user],
    }),
    addCatagoriesByAdminToSeller: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `${URL}/add-categories/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.seller, tagTypes.user],
    }),
    deleteSeller: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.seller, tagTypes.user],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllSellersQuery,
  useGetSingleSellerQuery,
  useAddSellerWithFormDataMutation,
  useUpdateSellerMutation,
  useDeleteSellerMutation,
  useAddCatagoriesByAdminToSellerMutation,
} = sellerApi;

export interface ISeller {
  _id: string;
  name: Name;
  userId: string;
  additionalRole: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  img: string;
  image: Image;
  isDelete: string;
  status: string;
  accessCategories: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  userDetails: UserDetails;
}

interface Name {
  firstName: string;
  lastName: string;
  _id: string;
}

interface Image {
  url: string;
  mimetype: string;
  filename: string;
  path: string;
  cdn: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDetails {
  _id: string;
  email: string;
  role: string;
  userId: string;
  status: string;
  verify: string;
  blockingTimeout: number;
  seller: string;
  isDelete: string;
  socketStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
