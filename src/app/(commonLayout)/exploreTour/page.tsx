/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/helper/loader";
import PaginationC from "@/helper/pagination";
import { useGetALlListingQuery } from "@/redux/feature/listing/listing.api";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Layers } from "lucide-react";

export default function ExploreTour() {
  const [page, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: listingData,
    isLoading,
    error,
  } = useGetALlListingQuery({
    page,
    limit,
    sortBy: "createdAt",
    sortOrder: sort,
    searchTerm,
  });

  const totalData = listingData?.data?.meta?.total || 0;
  const totalPages = Math.ceil(totalData / limit);

  const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Something went wrong. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        {/* Filter Section */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-45 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <SlidersHorizontal className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">Filter Tours</h2>
            </div>

            <div className="space-y-5">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    type="text"
                    placeholder="Search tours..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sort By Date
                </label>
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                  <select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-8 text-sm text-gray-800 appearance-none focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Show Per Page */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Show Per Page
                </label>
                <div className="relative">
                  <Layers className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-8 text-sm text-gray-800 appearance-none focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="1">1 Per Page</option>
                    <option value="5">5 Per Page</option>
                    <option value="10">10 Per Page</option>
                    <option value="15">15 Per Page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Section */}
        <main className="flex-1 space-y-8">
          <div className="border-b border-gray-100 pb-5 items-center ">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">
              Explore Amazing Tours
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base text-center">
              Discover culture, nature & unforgettable experiences. Found {totalData} tours.
            </p>
          </div>

          {listingData?.data?.data?.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">No Tours Found</h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search term or filters to find what you are looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listingData?.data?.data.map((listing: any) => (
                <article
                  key={listing.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={listing.images[0]}
                      alt={listing.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="eager"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {listing.title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                        {listing.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                      {listing.price && (
                        <span className="text-sm font-extrabold text-blue-600">
                          ৳ {listing.price.toLocaleString()}
                        </span>
                      )}
                      <Link
                        href={`/tourDetails/${listing.id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                      >
                        See details &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pt-6">
              <PaginationC
                pageArray={pageArray}
                setCurrentPage={setCurrentPage}
                page={page}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
