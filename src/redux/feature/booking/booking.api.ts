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
      providesTags: ["Booking"],
    }),

    turistBooking: builder.query({
      query: (params) => ({
        url: "/booking/turistBooking",
        method: "GET",
        params,
      }),
    }),

    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/booking/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useMyBookingQuery,
  useTuristBookingQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;
