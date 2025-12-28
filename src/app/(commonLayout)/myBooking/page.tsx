/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTuristBookingQuery } from "@/redux/feature/booking/booking.api";
import {
  View,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import { useState } from "react";

export default function Booking() {
  const [page, setCurrentPage] = useState(0);
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-6 rounded-lg">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-600 font-medium">কিছু একটা সমস্যা হয়েছে</p>
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
    <div className="max-w-6xl mx-auto min-h-screen px-3 sm:px-4  py-6 ">
      {/* Header */}
      <div className="mb-6 mt-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Booking list
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          total booking= {totalData}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tour ID
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Guide ID
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Group Size
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Booked At
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {bookingData?.data?.data.map((item: any, index: number) => (
                <tr
                  key={item.id}
                  className={`hover:bg-blue-50 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                      {item.listingId.slice(0, 10)}..
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
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
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        item.paymentStatus === "PAID"
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
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                        item.status === "CONFIRMED"
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
                  <td className="px-4 py-4 text-center">
                    <button className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors duration-150 shadow-sm hover:shadow">
                      <View size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                    item.status === "CONFIRMED"
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
                <button className="inline-flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors duration-150 shadow-sm hover:shadow">
                  <View size={16} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="">
        {bookingData && (
          <div className="flex gap-2 items-center justify-center my-10">
            <button
              className={` ${
                page === totalPages
                  ? "bg-gray-300 px-3 rounded-sm "
                  : "bg-blue-300 px-3 rounded-sm "
              }`}
              onClick={() => setCurrentPage(page - 1)}
              disabled={page === 1}
            >
              prev
            </button>
            {pageArray.map((item, index) => (
              <button
                className={`bg-blue-300 px-3 rounded-sm ${
                  page === index + 1 && "bg-green-500"
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
              className={` ${
                page === totalPages
                  ? "bg-gray-300 px-3 rounded-sm "
                  : "bg-blue-300 px-3 rounded-sm "
              }`}
            >
              next
            </button>
            <div className="flex gap-2 ">
              <label className="text-sm">show </label>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className=" border rounded-sm px-1 "
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
