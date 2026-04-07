/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/helper/loader";
import { useGetGuaidListingQuery } from "@/redux/feature/guaid/guaid.api";

export default function Page() {
  const { data, isLoading, error } = useGetGuaidListingQuery();
  console.log(error);
  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-2xl font-semibold">No Data Found</h2>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="border rounded-md min-w-225">
        {/* Header */}
        <div className="grid grid-cols-8 bg-gray-100 text-center font-semibold text-sm">
          <div className="py-3 border-r">ID</div>
          <div className="py-3 border-r">Title</div>
          <div className="py-3 border-r">Category</div>
          <div className="py-3 border-r">City</div>
          <div className="py-3 border-r">Duration</div>
          <div className="py-3 border-r">Max Group Size</div>
          <div className="py-3 border-r">Meeting Point</div>
          <div className="py-3">Price</div>
        </div>

        {/* Data Rows */}
        {data.data.map((item: any) => (
          <div
            key={item.id}
            className="grid grid-cols-8 text-center text-sm border-t hover:bg-gray-50 transition"
          >
            <div className="py-3 border-r"> {String(item.id).slice(0, 14)}</div>
            <div className="py-3 border-r">
              {" "}
              {String(item.title).slice(0, 14)}
            </div>
            <div className="py-3 border-r">{item.category}</div>
            <div className="py-3 border-r">{item.city}</div>
            <div className="py-3 border-r">{item.duration}</div>
            <div className="py-3 border-r">{item.maxGroupSize}</div>
            <div className="py-3 border-r">{item.meetingPoint}</div>
            <div className="py-3 font-medium text-green-600">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
