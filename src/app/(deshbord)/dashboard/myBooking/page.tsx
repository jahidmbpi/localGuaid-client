/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/helper/loader";
import { useTuristBookingQuery } from "@/redux/feature/booking/booking.api";
import {
  View,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  EllipsisVertical,
} from "lucide-react";

import { useState } from "react";

export default function Booking() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [page, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: bookingData,
    isLoading,
    error,
  } = useTuristBookingQuery({
    page,
    limit,
  });

  const totalData = bookingData?.data?.meta?.total || 0;

  const totalPages = Math.ceil(totalData / limit);
  const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-6 rounded-lg">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-600 font-medium">Something went Wrong</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="w-4 h-4" />;
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-3 sm:px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Booking list
        </h1>

        <p className="text-gray-600 text-sm sm:text-base">
          total booking = {totalData}
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl  border border-gray-200  flex-1">
        {/* Desktop Table */}
        <div className="hidden lg:block ">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                  Tour ID
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                  Guide ID
                </th>

                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase">
                  Group Size
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                  Amount
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                  Payment
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                  Status
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                  Booked At
                </th>

                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {bookingData?.data?.data.map((item: any, index: number) => (
                <tr
                  key={item.id}
                  className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-gray-700  px-2 py-1 rounded">
                      {item.listingId.slice(0, 10)}..
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-gray-700  px-2 py-1 rounded">
                      {item.guideId.slice(0, 10)}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
                      <Users className="w-4 h-4 text-blue-500" />
                      {item.groupSize}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="text-sm font-bold text-gray-800">
                      ৳{item.totalAmount.toLocaleString()}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                        }`}
                    >
                      <CreditCard className="w-3 h-3" />
                      {item.paymentStatus}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${item.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : item.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(item.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.id ? null : item.id
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-full transition"
                    >
                      <EllipsisVertical className="w-5 h-5" />
                    </button>

                    {openDropdown === item.id && (
                      <div className="absolute right-5 top-12 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          View
                        </button>

                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          Edit
                        </button>

                        <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50">
                          Delete
                        </button>
                        <button className={`block w-full text-left px-4 py-2 ${item.paymentStatus === "UNPAID" ? "text-green-500 hover:bg-green-50" : "text-red-500 hover:bg-red-50"
                          }`}>
                          Make Payment
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {bookingData?.data?.data.map((item: any) => (
            <div
              key={item.id}
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Tour ID
                  </p>

                  <p className="font-mono text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded inline-block">
                    {item.listingId.slice(0, 10)}..
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${item.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                >
                  {getStatusIcon(item.status)}
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Guide ID
                  </p>

                  <p className="font-mono text-sm font-semibold text-gray-700">
                    {item.guideId.slice(0, 10)}
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Group Size
                  </p>

                  <p className="inline-flex items-center gap-1 text-sm font-bold text-blue-700">
                    <Users className="w-4 h-4" />
                    {item.groupSize}
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Amount
                  </p>

                  <p className="text-base font-bold text-green-700">
                    ৳{item.totalAmount.toLocaleString()}
                  </p>
                </div>

                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Payment
                  </p>

                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-orange-700">
                    <CreditCard className="w-4 h-4" />
                    {item.paymentStatus}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />

                  <span>
                    {new Date(item.createdAt).toLocaleDateString("en-US")}
                  </span>
                </div>

                <button className="inline-flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition">
                  <View size={16} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-auto py-6">
        {bookingData && (
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <button
              className={`px-3 py-1 rounded-sm ${page === 1 ? "bg-gray-300" : "bg-blue-300"
                }`}
              onClick={() => setCurrentPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>

            {pageArray.map((item) => (
              <button
                className={`px-3 py-1 rounded-sm ${page === item ? "bg-green-500 text-white" : "bg-blue-300"
                  }`}
                key={item}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-sm ${page === totalPages ? "bg-gray-300" : "bg-blue-300"
                }`}
            >
              Next
            </button>

            <div className="flex gap-2 items-center">
              <label className="text-sm">Show</label>

              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded-sm px-2 py-1"
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}