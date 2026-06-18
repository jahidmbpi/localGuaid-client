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

const BookingTable = ({
  bookings,
  type,
}: {
  bookings: any[];
  type: "upcoming" | "past";
}) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-10 sm:p-14 text-center">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
            type === "upcoming" ? "bg-blue-100" : "bg-green-100"
          }`}
        >
          {type === "upcoming" ? (
            <CalendarDays className="w-10 h-10 text-blue-500" />
          ) : (
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {type === "upcoming" ? "No Upcoming Bookings" : "No Past Bookings"}
        </h3>

        <p className="text-gray-500">
          {type === "upcoming"
            ? "You don’t have any upcoming tours right now"
            : "Your completed tours will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Tour Schedule
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Group Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Booking Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((item: any, index: number) => (
              <tr
                key={item.id}
                className={`hover:bg-blue-50/50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                {/* Booking ID */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                    <span className="font-mono text-sm font-bold text-gray-800">
                      #{item.id.slice(0, 12)}
                    </span>
                  </div>
                </td>

                {/* Tour Schedule */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">
                      {new Date(item.startDate).toLocaleDateString()} -{" "}
                      {new Date(item.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>

                {/* Group Size */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold border border-purple-100">
                    <Users className="w-3.5 h-3.5" />
                    {item.groupSize} {item.groupSize > 1 ? "People" : "Person"}
                  </span>
                </td>

                {/* Total Amount */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    ৳ {item.totalAmount.toLocaleString()}
                  </span>
                </td>

                {/* Payment Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      item.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    {item.paymentStatus}
                  </span>
                </td>

                {/* Booking Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs ${getStatusStyle(
                      item.status,
                    )}`}
                  >
                    {getStatusIcon(item.status)}
                    {item.status}
                  </span>
                </td>

                {/* Created At */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden divide-y divide-gray-100">
        {bookings.map((item: any) => (
          <div
            key={item.id}
            className="p-5 hover:bg-gray-50/50 transition-colors duration-150"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                    Booking ID
                  </p>
                </div>
                <h3 className="font-mono text-sm font-bold text-gray-800">
                  #{item.id.slice(0, 12)}
                </h3>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs ${getStatusStyle(
                  item.status,
                )}`}
              >
                {getStatusIcon(item.status)}
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50/50 border border-blue-100/50 p-3 rounded-2xl">
                <p className="text-xs text-gray-400 font-semibold mb-1">
                  Schedule
                </p>
                <p className="text-xs font-semibold text-blue-700">
                  {new Date(item.startDate).toLocaleDateString()}
                </p>
                <p className="text-[10px] text-gray-400">to</p>
                <p className="text-xs font-semibold text-blue-700">
                  {new Date(item.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100/50 p-3 rounded-2xl flex flex-col justify-between">
                <p className="text-xs text-gray-400 font-semibold mb-1">
                  Amount
                </p>
                <p className="text-sm font-extrabold text-emerald-700">
                  ৳ {item.totalAmount.toLocaleString()}
                </p>
              </div>

              <div className="bg-purple-50/50 border border-purple-100/50 p-3 rounded-2xl flex flex-col justify-between">
                <p className="text-xs text-gray-400 font-semibold mb-1">
                  Group Size
                </p>
                <p className="text-xs font-bold text-purple-700">
                  {item.groupSize} {item.groupSize > 1 ? "People" : "Person"}
                </p>
              </div>

              <div className="bg-orange-50/50 border border-orange-100/50 p-3 rounded-2xl flex flex-col justify-between">
                <p className="text-xs text-gray-400 font-semibold mb-1">
                  Payment
                </p>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold w-fit ${
                    item.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.paymentStatus}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-dashed border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">
                  Created At
                </p>
                <p className="text-xs font-medium text-gray-600">
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold shadow-xs hover:shadow-md transition duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

          <BookingTable bookings={upcomingBookings} type="upcoming" />
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

          <BookingTable bookings={pastBookings} type="past" />
        </section>
      </div>
    </div>
  );
}
