"use client";
import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myBooking: builder.query({
      query: () => ({
        url: "/booking/mybooking",
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
    turistBooking: builder.query({
      query: (params) => ({
        url: "/booking/turistBooking",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useMyBookingQuery,
  useTuristBookingQuery,
  useGetALlListingQuery,
} = bookingApi;
