/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetListingByIdQuery } from "@/redux/feature/listing/listing.api";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Datepicker } from "@/component/uitls/datePicket";
import { Input } from "@/components/ui/input";
import { useCreateBookingMutation } from "@/redux/feature/booking/booking.api";
type FormData = {
  startDate: Date;
  endDate: Date;
  groupSize: number;
};

export default function Details() {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [Booking] = useCreateBookingMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { data, isLoading, error } = useGetListingByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading tour details...</p>;
  }

  if (error || !data?.data) {
    return <p className="text-center mt-10 text-red-500">Tour not found</p>;
  }

  const tour = data.data;
  const guideId = tour.guideId;

  const onSubmit = async (data: FormData) => {
    const BookingData = { ...data, guideId };
    console.log(BookingData);
    try {
      const result = await Booking({ id, BookingData });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    reset();
    setOpen(false);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-4 mt-20">
      <div>
        <h1 className="text-3xl font-bold">{tour.title}</h1>
        <p className="text-gray-500">
          {tour.city} • {tour.category}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tour.images?.map((img: string, index: number) => (
          <div
            key={index}
            className="relative w-full h-64 rounded-xl overflow-hidden"
          >
            <Image src={img} alt="tour image" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 text-[16px]">{tour.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
        <p className="text-gray-600 text-[16px]">{tour.itinerary}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard label="Duration" value={`${tour.duration} hrs`} />
        <InfoCard label="Price" value={`৳ ${tour.price}`} />
        <InfoCard label="Group Size" value={tour.maxGroupSize} />
        <InfoCard label="Bookings" value={tour.bookingCount} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Meeting Point</h2>
        <p className="text-gray-700 text-[16px]">{tour.meetingPoint}</p>
      </div>

      <div className="border rounded-xl p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
          {tour.guide?.name?.charAt(0)}
        </div>
        <div>
          <p className="font-semibold">{tour.guide?.name}</p>
          <p className="text-sm text-gray-500">{tour.guide?.email}</p>
          <p className="text-sm text-gray-500">{tour.guide?.phone}</p>
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="w-full md:w-auto bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Book This Tour
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Book Tour</h2>

            <div className="space-y-3">
              <form className="space-y-4">
                <div>
                  <label className="block mb-2">Start Date</label>

                  <Controller
                    control={control}
                    rules={{
                      required: "Start date is required",
                    }}
                    name="startDate"
                    render={({ field }) => (
                      <Datepicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2">End Date</label>

                  <Controller
                    control={control}
                    rules={{
                      required: "end Date is required",
                    }}
                    name="endDate"
                    render={({ field }) => (
                      <Datepicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Group Size</label>

                  <Controller
                    control={control}
                    rules={{ required: "group size required" }}
                    name="groupSize"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter group size"
                        className="w-full border rounded-lg px-3 py-2"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                  {errors.groupSize && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.groupSize.message}
                    </p>
                  )}
                </div>
              </form>

              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="border rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
