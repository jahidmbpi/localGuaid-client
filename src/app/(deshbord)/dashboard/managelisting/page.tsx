"use client";

import React, { useState } from "react";
import { useGetALlListingQuery } from "@/redux/feature/listing/listing.api";
import {
  Search,
  Layers,
  MapPin,
  DollarSign,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageListingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: listingsData, isLoading, error } = useGetALlListingQuery({});

  const filteredListings =
    listingsData?.data?.data?.filter((l: any) => {
      const search = searchTerm.toLowerCase();
      return (
        l.title?.toLowerCase().includes(search) ||
        l.category?.toLowerCase().includes(search) ||
        l.city?.toLowerCase().includes(search)
      );
    }) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-16 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-card border rounded-xl">
        <ShieldAlert className="w-12 h-12 text-destructive mb-3" />
        <h2 className="text-xl font-bold text-destructive mb-2">Failed to Load Listings</h2>
        <p className="text-muted-foreground text-sm">
          Please make sure the backend is running and you are logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Listing Management</h1>
        <p className="text-muted-foreground text-sm">
          Oversee and inspect all tourism guide listings published on the platform.
        </p>
      </div>

      {/* Control Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span>All Listings ({filteredListings.length})</span>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, city or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background pl-9 pr-4 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b text-muted-foreground font-semibold text-xs uppercase bg-muted/40">
                  <th className="p-3">Tour Spot</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Max Group</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Bookings</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredListings.length > 0 ? (
                  filteredListings.map((listing: any) => (
                    <tr key={listing.id} className="hover:bg-muted/30 transition-colors">
                      {/* Image & Title */}
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-10 rounded object-cover border">
                            <AvatarImage src={listing.images?.[0]} className="object-cover" />
                            <AvatarFallback className="rounded bg-muted">
                              <Layers className="w-4 h-4 text-muted-foreground" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground max-w-[200px] truncate">
                              {listing.title}
                            </p>
                            <p className="text-[10px] text-muted-foreground">ID: {listing.id?.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>

                      {/* City */}
                      <td className="p-3">
                        <div className="flex items-center gap-1 text-xs text-foreground font-medium">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span>{listing.city}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3 text-xs font-semibold text-muted-foreground">
                        {listing.category}
                      </td>

                      {/* Group Size */}
                      <td className="p-3 text-xs text-foreground font-medium">
                        {listing.maxGroupSize} People
                      </td>

                      {/* Price */}
                      <td className="p-3 font-bold text-xs text-green-600">
                        ${listing.price}
                      </td>

                      {/* Booking Count */}
                      <td className="p-3">
                        <div className="flex items-center gap-1 text-xs font-bold text-blue-500">
                          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                          <span>{listing.bookingCount || 0} bookings</span>
                        </div>
                      </td>

                      {/* Active Status Badge */}
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            listing.isActive
                              ? "bg-green-500/10 text-green-600 border border-green-500/20"
                              : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          }`}
                        >
                          {listing.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No listings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
