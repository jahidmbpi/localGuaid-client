"use client";
import { useGetALlListingQuery } from "@/redux/feature/listing/listing.api";

export default function ExploreTour() {
  const { data, isLoading, error } = useGetALlListingQuery(undefined);
  console.log(data);
  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="flex mt-20 flex-row">
        <div className="w-50 bg-red-500 border border-r-2 h-screen "></div>
        <div className=" w-full h-screen">
          <div className="text-center items-center justify-center mt-15">
            <h2 className="text-2xl font-sans font-bold tracking-tight">
              Explore Amazing Tours
            </h2>
            <p className="text-sm font-sans font-medium text-gray-600">
              Discover culture, nature & unforgettable experiences
            </p>
          </div>
          <div>
            <h2>this is tour card</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
