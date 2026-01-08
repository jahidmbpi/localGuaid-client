import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getALlUser: builder.query({
      query: () => ({
        url: "/user/getalluser",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetALlUserQuery } = userApi;
