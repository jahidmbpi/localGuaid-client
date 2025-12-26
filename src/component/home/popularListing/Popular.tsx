"use client";
import { useGetPopularListingQuery } from "@/redux/feature/listing/listing.api";
import Image from "next/image";

export default function Popular() {
  const {
    data: popularListing,
    error,
    isLoading,
  } = useGetPopularListingQuery(undefined);
  console.log(popularListing);
  console.log("error", error);
  return (
    <div className="max-w-6xl mx-auto px-2">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mt-16">
        <h2 className="text-3xl font-bold capitalize tracking-tight">
          Popular Destinations
        </h2>
        <p className="mt-4 text-gray-600 text-sm max-w-2xl text-center leading-relaxed">
          Discover the most loved travel destinations, carefully selected for
          their natural beauty, cultural heritage, and unforgettable
          experiences.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-12">
        {popularListing?.data?.map((listing) => (
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
  );
}
