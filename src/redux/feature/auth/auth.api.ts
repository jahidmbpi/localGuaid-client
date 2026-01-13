"use client";

import { baseApi } from "../../baseApi";
import { IResponse, IUser } from "./interface";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (loginfo) => ({
        url: "/auth/login",
        method: "POST",
        data: loginfo,
      }),
    }),
    me: builder.query<IResponse<IUser>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});
export const { useLogInMutation, useMeQuery } = authApi;
