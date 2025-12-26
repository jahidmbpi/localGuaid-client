"use client";
import { useGetPopularGuaidQuery } from "@/redux/feature/guaid/guaid.api";

export default function Guaid() {
  const {
    data: popularGuaidData,
    isLoading,
    error,
  } = useGetPopularGuaidQuery(undefined);
  console.log(error);
  console.log(popularGuaidData);
  return (
    <div className="max-w-6xl mx-auto px-2">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mt-16">
        <h2 className="text-3xl font-bold capitalize tracking-tight">
          our popular guaid
        </h2>
        <p className="mt-4 text-gray-600 text-sm max-w-2xl text-center leading-relaxed">
          Discover the most loved travel destinations, carefully selected for
          their natural beauty, cultural heritage, and unforgettable
          experiences.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-12">
        <h2>hm</h2>
      </div>
    </div>
  );
}
