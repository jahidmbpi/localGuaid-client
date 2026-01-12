"use client";

import { baseApi } from "../../baseApi";
interface IResponse<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "TOURIST" | "GUIDE" | "ADMIN";
  bio: string;
  profilePhoto: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCK";
  language: string[];
  credentials: string[];
  guideInfo?: string[];
  touristInfo: string[];
  createdAt: string;
}

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
