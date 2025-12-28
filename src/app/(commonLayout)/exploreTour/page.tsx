/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetALlListingQuery } from "@/redux/feature/listing/listing.api";
import Image from "next/image";
import { useState } from "react";

export default function ExploreTour() {
  const [page, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(2);
  console.log(limit);
  console.log(page);
  const {
    data: listingData,
    isLoading,
    error,
  } = useGetALlListingQuery({ page, limit });
  const totalData = listingData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalData / limit);

  const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (isLoading) {
    return <div className="text-center mt-20">লোড হচ্ছে...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        ডাটা লোড করতে সমস্যা হয়েছে
      </div>
    );
  }
  console.log("this is page", pageArray);

  console.log(listingData.data.meta);
  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="flex mt-20 flex-row">
        <div className="w-50 mt-17 border border-r-2 h-screen rounded-sm px-2 ">
          <div>
            <h2 className="text-[18px] font-sans font-medium mt-2">
              filter listing
            </h2>

            <div className="space-y-2">
              <div className="flex flex-col gap-2 ">
                <label className="text-sm">show per page</label>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className=" border p-1 rounded-sm px-1 w-full"
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className="flex flex-col gap2">
                <label className="text-sm font-sans">sort</label>
                <select defaultValue="" className="border p-1 rounded-sm">
                  <option className="text-sm font-sans" value="asec">
                    asec
                  </option>
                  <option className="text-sm font-sans" value="desc">
                    desc
                  </option>
                </select>
              </div>
              <div>
                <label className="text-sm font-sans font-medium">search</label>
                <input
                  className="w-full border rounded-sm py-1 px-2 text-sm"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full">
          <div className="text-center items-center justify-center mt-15">
            <h2 className="text-2xl font-sans font-bold tracking-tight">
              Explore Amazing Tours
            </h2>
            <p className="text-sm font-sans font-medium text-gray-600">
              Discover culture, nature & unforgettable experiences
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3  gap-2">
            {listingData?.data?.data.map((listing: any) => (
              <div
                key={listing.id}
                className="border rounded-lg overflow-hidden  hover:shadow-md transition p-2 "
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>

                <div className="space-y-2 mt-1">
                  <h2 className="text-lg font-bold">{listing.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {listing.description}
                  </p>
                  <p className="text-end text-sm text-blue-600">see more..</p>
                </div>
              </div>
            ))}
          </div>
          {/* this is paginton */}
          {listingData && (
            <div className="flex gap-2 items-center justify-center mb-10">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
