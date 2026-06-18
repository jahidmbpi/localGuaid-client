"use client";

import React from "react";
import { useMeQuery } from "@/redux/feature/auth/auth.api";
import { useGetDashboardMetaDataQuery } from "@/redux/feature/dashboard/dashboard.api";
import AdminDashboard from "@/component/dashboard/AdminDashboard";
import GuideDashboard from "@/component/dashboard/GuideDashboard";
import TouristDashboard from "@/component/dashboard/TouristDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: user, isLoading: isUserLoading } = useMeQuery();
  const { data: dashboardData, isLoading: isDashboardLoading, error } =
    useGetDashboardMetaDataQuery(undefined, {
      skip: !user?.data?.role,
    });

  const isLoading = isUserLoading || isDashboardLoading;
  const role = user?.data?.role;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-5 space-y-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-5 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-6 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-5 space-y-4">
              <Skeleton className="h-6 w-36" />
              <div className="space-y-4 pt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2.5 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !dashboardData?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-card border rounded-xl">
        <h2 className="text-xl font-bold text-destructive mb-2">Error Loading Dashboard</h2>
        <p className="text-muted-foreground text-sm max-w-md">
          There was an issue fetching dashboard data. Please make sure you are logged in and try again.
        </p>
      </div>
    );
  }

  // Render role-specific dashboards
  switch (role) {
    case "ADMIN":
      return <AdminDashboard data={dashboardData.data} />;
    case "GUIDE":
      return <GuideDashboard data={dashboardData.data} />;
    case "TOURIST":
      return <TouristDashboard data={dashboardData.data} />;
    default:
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-card border rounded-xl">
          <h2 className="text-xl font-bold mb-2">Unauthorized Access</h2>
          <p className="text-muted-foreground text-sm">
            We could not verify your role. Please contact support.
          </p>
        </div>
      );
  }
}
