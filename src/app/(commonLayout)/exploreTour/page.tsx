/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetALlListingQuery } from "@/redux/feature/listing/listing.api";
import Image from "next/image";

export default function ExploreTour() {
  const {
    data: listingData,
    isLoading,
    error,
  } = useGetALlListingQuery(undefined);
  console.log(listingData);
  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="flex mt-20 flex-row">
        <div className="w-50 bg-red-500 border border-r-2 h-screen "></div>
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
        </div>
      </div>
    </div>
  );
}
