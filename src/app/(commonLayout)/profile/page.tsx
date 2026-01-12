"use client";
import Image from "next/image";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeQuery } from "@/redux/feature/auth/auth.api";
import Loader from "@/helper/loader";

export default function UserProfilePage() {
  const { data: user, isLoading } = useMeQuery();
  console.log("this is user data from profile page", user);
  const userData = user?.data;

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-6xl mx-auto  h-screen  ">
      <div className="items-center justify-center h-screen flex">
        <div className="p-6 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            <Image
              src={userData!.profilePhoto!}
              alt="User"
              width={200}
              height={200}
              className="rounded-full border"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{userData?.name}</h1>
              <p className="text-sm text-gray-600">{userData?.email}</p>
              <p className="mt-1 text-sm font-medium text-blue-600 capitalize">
                Role: {userData?.role}
              </p>
            </div>

            <Button variant="outline" className="flex gap-2">
              <Edit className="w-4 h-4" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
