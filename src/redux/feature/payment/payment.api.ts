import { baseApi } from "@/redux/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentInit: builder.mutation({
      query: (id) => ({
        url: `/payment/initPyament/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { usePaymentInitMutation } = paymentApi;
