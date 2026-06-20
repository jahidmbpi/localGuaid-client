"use client";
import { baseApi } from "@/redux/baseApi";

export const guaidApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularGuaid: builder.query({
      query: () => ({
        url: "/guaid/popular-guaid",
        method: "GET",
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getGuaidListing: builder.query<any, void>({
      query: () => ({
        url: "/guaid/guaidlisting",
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
    becomeGuaid: builder.mutation({
      query: (guideInfo) => ({
        url: "/guaid/become-guaid",
        method: "POST",
        data: guideInfo,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetPopularGuaidQuery,
  useGetGuaidListingQuery,
  useBecomeGuaidMutation,
} = guaidApi;
