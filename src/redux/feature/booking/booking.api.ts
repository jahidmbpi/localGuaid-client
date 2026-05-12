/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ id, BookingData }) => ({
        url: `/booking/create-booking/${id}`,
        method: "POST",
        data: BookingData,
      }),
      invalidatesTags: ["Booking"],
    }),

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

    upcomingBooking: builder.query<any, void>({
      query: () => ({
        url: "/booking/upcoming",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useMyBookingQuery,
  useTuristBookingQuery,
  useUpdateBookingStatusMutation,
  useUpcomingBookingQuery,
} = bookingApi;
