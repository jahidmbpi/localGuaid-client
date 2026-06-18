"use client";

import { baseApi } from "../../baseApi";
import { IResponse } from "../auth/interface";

export interface IDashboardStats {
  // Admin stats
  totalUsers?: number;
  totalTourists?: number;
  totalGuides?: number;
  totalListings?: number;
  totalBookings?: number;
  totalRevenue?: number;
  
  // Guide stats
  totalEarnings?: number;
  
  // Tourist stats
  totalSpent?: number;
}

export interface IBookingStatusBreakdown {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export interface IRecentBooking {
  id: string;
  touristId: string;
  guideId: string;
  listingId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  totalAmount: number;
  createdAt: string;
  Tourist?: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
  };
  guide?: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
  };
  listing?: {
    id: string;
    title: string;
    images: string[];
    price: number;
  };
}

export interface IDashboardMetaData {
  role: "ADMIN" | "GUIDE" | "TOURIST";
  stats: IDashboardStats;
  bookingStatusBreakdown: IBookingStatusBreakdown;
  recentBookings: IRecentBooking[];
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardMetaData: builder.query<IResponse<IDashboardMetaData>, void>({
      query: () => ({
        url: "/deshbord/meta-data",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
  }),
});

export const { useGetDashboardMetaDataQuery } = dashboardApi;
