/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myBooking: builder.query<any, void>({
      query: () => ({
        url: "/booking/mybooking",
        method: "GET",
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

export const { useMyBookingQuery, useTuristBookingQuery } = bookingApi;
