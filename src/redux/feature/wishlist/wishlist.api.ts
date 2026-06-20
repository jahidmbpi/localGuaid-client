"use client";
import { baseApi } from "@/redux/baseApi";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWishlist: builder.query<any, void>({
      query: () => ({
        url: "/wishlist/my-wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (listingId) => ({
        url: "/wishlist",
        method: "POST",
        data: { listingId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: (listingId) => ({
        url: `/wishlist/${listingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetMyWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
