"use client";
import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (loginfo) => ({
        url: "/auth/login",
        method: "POST",
        data: loginfo,
      }),
    }),
    me: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});
export const { useLogInMutation, useMeQuery } = authApi;
