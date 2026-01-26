/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetPopularGuaidQuery } from "@/redux/feature/guaid/guaid.api";

import Image from "next/image";

export default function Guaid() {
  const {
    data: popularGuaidData,
    isLoading,
    error,
  } = useGetPopularGuaidQuery(undefined);
  console.log(error);
  console.log(popularGuaidData);
  console.log(isLoading);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mt-12">
        {popularGuaidData?.data.map((guaid: any, index: any) => (
          <div className="relative group" key={index}>
            <Image
              src={guaid.profilePhoto}
              width={1000}
              height={1000}
              alt="User"
              className=" p-2 h-70 w-full object-cover rounded-2xl"
            />
            <div className="absolute -bottom-2 left-6 transition-all group-hover:-translate-y-8 duration-300 ease-out">
              <h2 className="text-xl font-medium">{guaid.name}</h2>
              <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100">
                Professional Travel Guide
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
