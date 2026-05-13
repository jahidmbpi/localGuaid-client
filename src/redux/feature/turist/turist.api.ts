/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

const turistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upcommingAndpastBooking: builder.query<any, void>({
      query: () => ({
        url: "/turist/upcoming-past",
        method: "GET",
      }),
    }),
  }),
});

export const { useUpcommingAndpastBookingQuery } = turistApi;
