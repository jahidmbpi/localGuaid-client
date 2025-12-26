"use client";

import { baseApi } from "@/redux/baseApi";

export const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularListing: builder.query({
      query: () => ({
        url: "/listing/popular",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPopularListingQuery } = listingApi;
