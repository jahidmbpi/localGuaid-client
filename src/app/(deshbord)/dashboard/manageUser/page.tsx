"use client";

import React, { useState } from "react";
import {
  useGetALlUserQuery,
  useUpdateUserByIDMutation,
} from "@/redux/feature/user/user.api";
import {
  Search,
  UserCheck,
  UserX,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageUsersPage() {
  const { data: usersData, isLoading, error } = useGetALlUserQuery(undefined);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserByIDMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "BLOCK" : "ACTIVE";
    try {
      await updateUser({
        id: userId,
        userInfo: { status: nextStatus },
      }).unwrap();
    } catch (err) {
      console.error("Failed to update user status:", err);
      alert("Error updating user status. Make sure the backend allows this action.");
    }
  };

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === "GUIDE" ? "TOURIST" : "GUIDE";
    try {
      await updateUser({
        id: userId,
        userInfo: { role: nextRole },
      }).unwrap();
    } catch (err) {
      console.error("Failed to update user role:", err);
      alert("Error updating user role.");
    }
  };

  const filteredUsers =
    usersData?.data?.filter((u: any) => {
      const search = searchTerm.toLowerCase();
      return (
        u.name?.toLowerCase().includes(search) ||
        u.email?.toLowerCase().includes(search) ||
        u.role?.toLowerCase().includes(search)
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
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-24" />
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
        <h2 className="text-xl font-bold text-destructive mb-2">Failed to Load Users</h2>
        <p className="text-muted-foreground text-sm">
          Please make sure you are logged in as an Admin and the backend is running.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">User Management</h1>
        <p className="text-muted-foreground text-sm">
          Manage all registered user accounts, toggle statuses, and change roles.
        </p>
      </div>

      {/* Users Control Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span>All Users ({filteredUsers.length})</span>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, email or role..."
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
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Registered At</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user: any) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      {/* User Avatar & Info */}
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9 border">
                            <AvatarImage src={user.profilePhoto} />
                            <AvatarFallback>
                              {user.name?.slice(0, 2).toUpperCase() || "US"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* User Role */}
                      <td className="p-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            user.role === "ADMIN"
                              ? "bg-red-500/10 text-red-500 border border-red-500/20"
                              : user.role === "GUIDE"
                              ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                              : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* User Status */}
                      <td className="p-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            user.status === "ACTIVE"
                              ? "bg-green-500/10 text-green-600 border border-green-500/20"
                              : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Registered Date */}
                      <td className="p-3 text-muted-foreground text-xs">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Change Role Button (Toggle between Tourist & Guide) */}
                          {user.role !== "ADMIN" && (
                            <button
                              type="button"
                              onClick={() => handleRoleChange(user.id, user.role)}
                              disabled={isUpdating}
                              className="px-2.5 py-1 text-xs font-medium border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
                            >
                              Make {user.role === "GUIDE" ? "Tourist" : "Guide"}
                            </button>
                          )}

                          {/* Block/Unblock Button */}
                          {user.role !== "ADMIN" && (
                            <button
                              type="button"
                              onClick={() => handleStatusToggle(user.id, user.status)}
                              disabled={isUpdating}
                              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors disabled:opacity-50 ${
                                user.status === "ACTIVE"
                                  ? "text-rose-500 border-rose-500/20 hover:bg-rose-500/10"
                                  : "text-green-600 border-green-500/20 hover:bg-green-500/10"
                              }`}
                            >
                              {isUpdating ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : user.status === "ACTIVE" ? (
                                <>
                                  <UserX className="w-3.5 h-3.5" />
                                  <span>Block</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3.5 h-3.5" />
                                  <span>Activate</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No users found.
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
