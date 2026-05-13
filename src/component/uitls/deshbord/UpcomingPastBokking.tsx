/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/helper/loader";
import { useUpcommingAndpastBookingQuery } from "@/redux/feature/turist/turist.api";
import {
  CalendarDays,
  Users,
  CreditCard,
  CheckCircle2,
  Clock3,
  XCircle,
  Sparkles,
} from "lucide-react";

export default function UpcomingPastBokking() {
  const { data, isLoading, error } = useUpcommingAndpastBookingQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white border border-red-100 shadow-lg rounded-3xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>

          <p className="text-gray-500">Failed to load booking information</p>
        </div>
      </div>
    );
  }

  const upcomingBookings = data?.data?.upcomingBookings || [];
  const pastBookings = data?.data?.pastBookings || [];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 border border-green-200";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700 border border-blue-200";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";

      default:
        return "bg-red-100 text-red-700 border border-red-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "CONFIRMED":
        return <CheckCircle2 className="w-4 h-4" />;

      case "PENDING":
        return <Clock3 className="w-4 h-4" />;

      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const BookingCard = ({ item }: any) => (
    <div className="group relative w-full max-w-[420px] min-w-0 mx-auto overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Gradient top */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />

              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                Booking ID
              </p>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-all">
              #{item.id.slice(0, 12)}
            </h2>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm ${getStatusStyle(
              item.status,
            )}`}
          >
            {getStatusIcon(item.status)}
            {item.status}
          </span>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tour Date */}
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-4 h-4 text-blue-600" />

              <p className="text-sm font-semibold text-blue-700">
                Tour Schedule
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-700 font-medium">
                {new Date(item.startDate).toLocaleDateString()}
              </p>

              <p className="text-xs text-gray-400">to</p>

              <p className="text-sm text-gray-700 font-medium">
                {new Date(item.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />

              <p className="text-sm font-semibold text-emerald-700">
                Total Amount
              </p>
            </div>

            <h2 className="text-2xl font-extrabold text-emerald-700 break-words">
              ৳ {item.totalAmount}
            </h2>
          </div>

          {/* Group Size */}
          <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-600" />

              <p className="text-sm font-semibold text-purple-700">
                Group Size
              </p>
            </div>

            <h2 className="text-xl font-bold text-purple-700">
              {item.groupSize} Person
            </h2>
          </div>

          {/* Payment Status */}
          <div className="rounded-2xl bg-orange-50 border border-orange-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-orange-600" />

              <p className="text-sm font-semibold text-orange-700">
                Payment Status
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                item.paymentStatus === "PAID"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              {item.paymentStatus}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-dashed border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Created At</p>

            <p className="text-sm font-medium text-gray-700">
              {new Date(item.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          <button className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto space-y-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Tour Bookings
          </h1>

          <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Manage your upcoming tours and explore your completed travel history
          </p>
        </div>

        {/* Upcoming Bookings */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Upcoming Bookings
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Your confirmed future travel plans
              </p>
            </div>

            <div className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm shadow-sm">
              {upcomingBookings.length} Bookings
            </div>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-10 sm:p-14 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5">
                <CalendarDays className="w-10 h-10 text-blue-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Upcoming Bookings
              </h3>

              <p className="text-gray-500">
                You don’t have any upcoming tours right now
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,420px))] justify-center gap-6">
              {upcomingBookings.map((item: any) => (
                <BookingCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        {/* Past Bookings */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Past Bookings
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Your completed travel history
              </p>
            </div>

            <div className="px-5 py-2 rounded-full bg-green-100 text-green-700 font-bold text-sm shadow-sm">
              {pastBookings.length} Bookings
            </div>
          </div>

          {pastBookings.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-10 sm:p-14 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Past Bookings
              </h3>

              <p className="text-gray-500">
                Your completed tours will appear here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,420px))] justify-center gap-6">
              {pastBookings.map((item: any) => (
                <BookingCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
