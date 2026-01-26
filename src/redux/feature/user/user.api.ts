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

    updateUserByID: builder.mutation({
      query: ({ userInfo, id }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetALlUserQuery,
  useGetUserByIdQuery,
  useUpdateUserByIDMutation,
} = userApi;
