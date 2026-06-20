"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetMyWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/feature/wishlist/wishlist.api";
import { useMeQuery } from "@/redux/feature/auth/auth.api";
import { Heart, Trash2, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/helper/loader";

export default function WishlistPage() {
  const router = useRouter();
  const { data: user } = useMeQuery();
  const { data: wishlistData, isLoading } = useGetMyWishlistQuery(undefined, {
    skip: !user?.data,
  });
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  const handleRemove = async (listingId: string) => {
    try {
      await removeFromWishlist(listingId).unwrap();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader />
        <p className="text-sm text-gray-500 font-medium animate-pulse">Loading your wishlist...</p>
      </div>
    );
  }

  const wishlistedItems = wishlistData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10">
          <Heart className="w-80 h-80 fill-white" />
        </div>
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            My Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Your Saved Tours</h1>
          <p className="text-blue-100 max-w-xl text-sm sm:text-base leading-relaxed">
            Keep track of the experiences and tours you want to take next. Book them whenever you're ready!
          </p>
        </div>
      </div>

      {wishlistedItems.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm max-w-2xl mx-auto space-y-5">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-500">
            <Heart className="w-8 h-8 fill-blue-50/10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">Your Wishlist is Empty</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              Explore our local tour listings and add your favorite experiences here to plan your next travel adventure!
            </p>
          </div>
          <Button onClick={() => router.push("/exploreTour")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-medium">
            Explore Tours
          </Button>
        </div>
      ) : (
        /* Grid List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedItems.map((item: any) => {
            const tour = item.listing;
            if (!tour) return null;
            return (
              <Card key={item.id} className="group border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full bg-white">
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={tour.images?.[0] || "/placeholder-tour.jpg"}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => handleRemove(tour.id)}
                    disabled={isRemoving}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-red-50 text-gray-600 hover:text-red-600 p-2.5 rounded-full shadow-md transition backdrop-blur-xs flex items-center justify-center cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-4 left-4 bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                    ৳ {tour.price?.toLocaleString()}
                  </span>
                </div>

                {/* Card Info Content */}
                <CardContent className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      {tour.city || "Unknown City"}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {tour.duration} hrs
                    </span>
                    <Link
                      href={`/tourDetails/${tour.id}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                    >
                      View Tour
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
