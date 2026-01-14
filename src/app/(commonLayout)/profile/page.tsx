"use client";
import Image from "next/image";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeQuery } from "@/redux/feature/auth/auth.api";
import Loader from "@/helper/loader";
import Link from "next/link";

export default function UserProfilePage() {
  const { data: user, isLoading } = useMeQuery();
  const userData = user?.data;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4">
      <div className="flex flex-col items-center justify-center min-h-[135vh] md:min-h-screen">
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex flex-col items-center md:items-start gap-4  w-full">
            <Image
              src={userData?.profilePhoto || "/avatar.png"}
              alt="User"
              width={180}
              height={180}
              className="rounded-full border object-cover"
            />

            <div className="flex flex-col items-center md:items-start md:flex-row justify-between w-full space-y-4">
              <div className="space-y-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold capitalize">
                  {userData?.name}
                </h1>

                <p className="text-sm md:text-base text-gray-600">
                  {userData?.email}
                </p>

                <p className="text-xs md:text-sm text-gray-500">
                  User ID:
                  <span className="ml-2 font-medium text-gray-700">
                    {userData?.id}
                  </span>
                </p>
              </div>

              <Link href={`/profile/${userData!.id}`}>
                {" "}
                <Button variant="outline" className="flex gap-2 w-25">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="max-w-3xl space-y-2 md:text-start w-full ">
            <h2 className="text-xl md:text-2xl font-semibold capitalize">
              Bio
            </h2>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {userData?.bio ||
                "No bio added yet. Update your profile to add a bio."}
            </p>
          </div>

          <div className=" w-full  space-y-5 text-sm md:text-base">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <p className="font-medium">
                📞 Phone:
                <span className="ml-2 font-normal text-gray-600">
                  {userData?.phone || "N/A"}
                </span>
              </p>

              <p className="font-medium">
                🎭 Role:
                <span className="ml-2 font-normal text-gray-600">
                  {userData?.role}
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-medium">
                🏠 Present Address:
                <span className="ml-2 font-normal text-gray-600">
                  {userData?.presentAddress || "N/A"}
                </span>
              </p>

              <p className="font-medium">
                📍 Permanent Address:
                <span className="ml-2 font-normal text-gray-600">
                  {userData?.parmanentAddress || "N/A"}
                </span>
              </p>
            </div>

            {/* ===== Language ===== */}
            <div className="flex flex-col sm:flex-row gap-2">
              <p className="font-medium">🌐 Languages:</p>

              {userData?.language?.length ? (
                <div className="flex flex-wrap gap-2">
                  {userData.language.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No language found</p>
              )}
            </div>

            {/* ===== Status ===== */}
            <div className="text-right">
              <p className="font-medium capitalize">
                Status:
                <span className="ml-2 font-normal text-gray-600">
                  {userData?.status}
                </span>
              </p>
            </div>

            {/* ===== Tourist ===== */}
            {userData?.role === "TOURIST" && (
              <div>
                <p className="font-medium">
                  Preferences:
                  <span className="ml-2 font-normal text-gray-600">
                    {userData.touristInfo?.preferences || "N/A"}
                  </span>
                </p>
              </div>
            )}

            {/* ===== Guide ===== */}
            {userData?.role === "GUIDE" && (
              <div className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold capitalize">
                  Guide Info
                </h2>

                <div>
                  <p className="font-medium mb-1">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.guideInfo?.expertise?.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-medium">
                  Daily Rate:
                  <span className="ml-2 font-normal text-gray-600">
                    {userData.guideInfo?.dailyRate}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
