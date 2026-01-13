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
      <div className="items-center justify-center h-screen flex flex-col">
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
              <p className="mt-1 text-sm font-medium  capitalize ">
                userId:<span className="ml-2">{userData?.id}</span>
              </p>
            </div>

            <Button variant="outline" className="flex gap-2">
              <Edit className="w-4 h-4" /> Edit Profile
            </Button>
          </div>
        </div>
        <div className="max-w-3xl px-14 space-y-4">
          <h2 className="text-2xl font-bold font-sans capitalize">bio</h2>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            aliquam veniam debitis, unde veritatis optio repellat reprehenderit
            nemo dicta esse.
          </p>
        </div>
        <div className="max-w-3xl px-14 space-y-4  w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium  capitalize">
              phone:{userData?.phone}
            </h2>
            <h2>Role:{userData?.role}</h2>
          </div>
          <div>
            <h2 className="capitalize font-medium">
              present address:{userData?.presentAddress}
            </h2>
            <h2 className="capitalize font-medium">
              {" "}
              parmanent address:{userData?.presentAddress}
            </h2>
          </div>
          <div className="flex gap-4">
            <h2>Language:</h2>

            {userData?.language && userData.language.length > 0 ? (
              <div className="space-y-1">
                {userData.language.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            ) : (
              <p>No language found</p>
            )}
          </div>
          <div className="">
            <h2 className="capitalize font-medium text-end">
              status :
              <span className="font-normal text-sm ml-2">
                {userData?.status}
              </span>
            </h2>
          </div>
          <div>
            {userData?.role === "TOURIST" && (
              <h2>preferences:{userData.touristInfo?.preferences}</h2>
            )}
          </div>
          <div>
            {userData?.role === "GUIDE" && (
              <div>
                <h2 className="capitalize text-xl font-medium">guide Info</h2>
                <div className="font-medium">
                  <h2>expertise</h2>
                  {userData.guideInfo?.expertise.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
                <h2 className="font-medium">
                  daeilyrate:{userData.guideInfo?.dailyRate}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
