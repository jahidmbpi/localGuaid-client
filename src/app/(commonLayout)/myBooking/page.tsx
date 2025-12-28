/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTuristBookingQuery } from "@/redux/feature/booking/booking.api";
import { View } from "lucide-react";

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
  console.log("this os total", pageArray);

  if (isLoading) {
    return <div className="text-center mt-20">লোড হচ্ছে...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        কিছু একটা সমস্যা হয়েছে
      </div>
    );
  }

  console.log("booking data", bookingData);
  return (
    <div className="max-w-6xl mx-auto min-h-screen px-2">
      <div className="mt-25 border p-2 rounded-sm">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-700">
              <th className="p-3">Tour id</th>
              <th className="p-3">guaid id</th>

              <th className="p-3">Group size</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Booked At</th>
              <th className="p-3">action</th>
            </tr>
          </thead>

          <tbody>
            {bookingData?.data?.data.map((item: any) => (
              <tr key={item.id} className="border-t hover:bg-gray-50 text-sm">
                <td className="p-3 font-medium">
                  {item.listingId.slice(0, 10)}..
                </td>
                <td className="p-3 font-medium">{item.guideId.slice(0, 10)}</td>

                <td className="p-3 text-center">{item.groupSize}</td>

                <td className="p-3 font-semibold">৳{item.totalAmount}</td>
                <td className="p-3 font-semibold">৳{item.paymentStatus}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
              ${
                item.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : item.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 font-semibold">৳{item.createdAt}</td>
                <td className="p-3 font-semibold">
                  <View />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages && (
        <div className="flex flex-wrap gap-2 items-center justify-center my-10">
          <button
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-blue-300 disabled:bg-gray-300"
          >
            Prev
          </button>

          {pageArray.map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`px-3 py-1 rounded ${
                page === item ? "bg-green-500 text-white" : "bg-blue-300"
              }`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-blue-300 disabled:bg-gray-300"
          >
            Next
          </button>

          <div className="flex items-center gap-2 ml-4">
            <label className="text-sm">Show</label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border p-1 rounded"
            >
              <option value="5">5</option>
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
