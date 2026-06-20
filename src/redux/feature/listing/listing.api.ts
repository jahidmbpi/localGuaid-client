/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PopularListing } from "@/interface/listing.interface";
import { baseApi } from "@/redux/baseApi";

export interface PopularListingResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: PopularListing[];
}

export const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularListing: builder.query<PopularListingResponse, void>({
      query: () => ({
        url: "/listing/popular",
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
    getALlListing: builder.query({
      query: (params) => ({
        url: "/listing/getALlListing",
        method: "GET",
        params,
      }),
      providesTags: ["Listing"],
    }),
    getListingById: builder.query({
      query: (id) => ({
        url: `/listing/${id}`,
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
    createListing: builder.mutation({
      query: (data) => ({
        url: "/listing/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Listing"],
    }),
    updateListing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/listing/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Listing"],
    }),
    deleteListing: builder.mutation({
      query: (id) => ({
        url: `/listing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listing"],
    }),
  }),
});

export const {
  useGetPopularListingQuery,
  useGetALlListingQuery,
  useGetListingByIdQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
} = listingApi;
