import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        data: userInfo,
      }),
    }),
    getALlUser: builder.query({
      query: () => ({
        url: "/user/getalluser",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterMutation, useGetALlUserQuery } = userApi;
