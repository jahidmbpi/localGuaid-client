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
    }),
    getALlListing: builder.query({
      query: (params) => ({
        url: "/listing/getALlListing",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetPopularListingQuery, useGetALlListingQuery } = listingApi;
