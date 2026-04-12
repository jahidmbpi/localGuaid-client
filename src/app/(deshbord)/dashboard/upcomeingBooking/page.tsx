/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/helper/loader";
import { formatDate } from "@/lib/helpers";
import {
  useUpcomingBookingQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/feature/booking/booking.api";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { data: upcomingBooking, isLoading, error } = useUpcomingBookingQuery();
  const [updateStatus] = useUpdateBookingStatusMutation();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const handleUpdate = async (id: string, status: string) => {
    try {
      console.log(id, status);
      const result = await updateStatus({ id, status }).unwrap();
      console.log(result);
      alert(`Booking ${status} ✅`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };
  console.log(upcomingBooking?.data);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load bookings</p>
    );
  }

  // 📭 Empty state
  if (!upcomingBooking?.data || upcomingBooking.data.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No pending bookings found
      </p>
    );
  }

  return (
    <div className="min-h-screen">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Pending Requests
      </h1> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {upcomingBooking.data.map((data: any) => (
          <div
            key={data.id}
            className="bg-white rounded-2xl shadow-md p-4 border hover:shadow-xl transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-gray-700">
                Booking Info
              </h2>

              <div className="mt-4 flex justify-between items-center">
                {/* 3-dot menu */}
                <div className="relative ml-2">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === data.id ? null : data.id)
                    }
                    className="p-2 rounded-lg hover:bg-gray-200"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown */}
                  {openMenuId === data.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-10">
                      <button
                        onClick={() => {
                          handleUpdate(data.id, "COMPLETED");
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-green-100"
                      >
                        COMPLETED
                      </button>

                      <button
                        onClick={() => {
                          handleUpdate(data.id, "CANCELLED");
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-red-100"
                      >
                        CENCELLED
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="text-sm text-gray-600 space-y-1 border-b pb-2">
              <p>📅 Start: {formatDate(data.startDate)}</p>
              <p>📅 End: {formatDate(data.endDate)}</p>
            </div>

            {/* Info */}
            <div className="mt-2 text-sm text-gray-700 space-y-1 border-b pb-2">
              <p>👥 Group Size: {data.groupSize}</p>
              <p>💰 ৳{data.totalAmount}</p>
            </div>

            {/* Footer */}
            <div className="mt-3 flex justify-between items-center">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  data.paymentStatus === "UNPAID"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {data.paymentStatus}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center">
              {/* 3-dot menu */}
              {/* View Details */}
              <span className="px-3 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-600">
                {data.status}
              </span>
              {/* View Details */}
              <button
                className="px-2 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 text-sm font-sans"
                onClick={() => alert(`View details for ${data.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
