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
  }),
});

export const { useGetPopularGuaidQuery } = guaidApi;
