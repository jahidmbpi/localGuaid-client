"use client";

import React from "react";
import { IDashboardMetaData } from "@/redux/feature/dashboard/dashboard.api";
import {
  Briefcase,
  Layers,
  DollarSign,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GuideDashboardProps {
  data: IDashboardMetaData;
}

export default function GuideDashboard({ data }: GuideDashboardProps) {
  const { stats, bookingStatusBreakdown, recentBookings } = data;

  const totalBookings =
    (bookingStatusBreakdown.pending || 0) +
    (bookingStatusBreakdown.confirmed || 0) +
    (bookingStatusBreakdown.completed || 0) +
    (bookingStatusBreakdown.cancelled || 0);

  const getPercentage = (count: number) => {
    if (!totalBookings) return 0;
    return Math.round((count / totalBookings) * 100);
  };

  const metrics = [
    {
      title: "My Bookings",
      value: stats.totalBookings ?? 0,
      icon: Briefcase,
      description: "Total tours requested",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Active Listings",
      value: stats.totalListings ?? 0,
      icon: Layers,
      description: "Your active tour spots",
      color: "text-green-500 bg-green-500/10",
    },
    {
      title: "Total Earnings",
      value: `$${(stats.totalEarnings ?? 0).toLocaleString()}`,
      icon: DollarSign,
      description: "Cleared revenue",
      color: "text-purple-500 bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Guide Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Track your active listings, earnings, and manage upcoming tour reservations.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${metric.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
                  <p className="text-xs font-medium text-foreground mt-1">{metric.title}</p>
                  <p className="text-[10px] text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Middle Section: Status Breakdown & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Booking Statuses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Pending */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Pending Request</span>
                <span className="text-amber-500">
                  {bookingStatusBreakdown.pending} ({getPercentage(bookingStatusBreakdown.pending)}%)
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(bookingStatusBreakdown.pending)}%` }}
                />
              </div>
            </div>

            {/* Confirmed */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Confirmed Trips</span>
                <span className="text-blue-500">
                  {bookingStatusBreakdown.confirmed} ({getPercentage(bookingStatusBreakdown.confirmed)}%)
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(bookingStatusBreakdown.confirmed)}%` }}
                />
              </div>
            </div>

            {/* Completed */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Completed Trips</span>
                <span className="text-green-500">
                  {bookingStatusBreakdown.completed} ({getPercentage(bookingStatusBreakdown.completed)}%)
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(bookingStatusBreakdown.completed)}%` }}
                />
              </div>
            </div>

            {/* Cancelled */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Cancelled Trips</span>
                <span className="text-rose-500">
                  {bookingStatusBreakdown.cancelled} ({getPercentage(bookingStatusBreakdown.cancelled)}%)
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(bookingStatusBreakdown.cancelled)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Tourist Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-muted-foreground font-medium text-xs uppercase">
                    <th className="pb-3">Tourist</th>
                    <th className="pb-3">Tour Spot</th>
                    <th className="pb-3">Total Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentBookings && recentBookings.length > 0 ? (
                    recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3.5 pr-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={booking.Tourist?.profilePhoto} />
                              <AvatarFallback>
                                {booking.Tourist?.name?.slice(0, 2).toUpperCase() || "TR"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-xs leading-none">
                                {booking.Tourist?.name || "Unknown Tourist"}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {booking.Tourist?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-medium max-w-[180px] truncate text-xs">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span>{booking.listing?.title || "Tour Spot"}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-bold text-xs">${booking.totalAmount}</td>
                        <td className="py-3.5 px-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              booking.status === "CONFIRMED"
                                ? "bg-blue-500/10 text-blue-500"
                                : booking.status === "COMPLETED"
                                ? "bg-green-500/10 text-green-500"
                                : booking.status === "PENDING"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-rose-500/10 text-rose-500"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3.5 pl-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              booking.paymentStatus === "PAID"
                                ? "bg-green-500/10 text-green-500"
                                : booking.paymentStatus === "PENDING"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-rose-500/10 text-rose-500"
                            }`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                        No tourist bookings requested yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
