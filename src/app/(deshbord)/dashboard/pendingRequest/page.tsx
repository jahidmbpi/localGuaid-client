"use client";
import { useMyBookingQuery } from "@/redux/feature/booking/booking.api";

export default function Pendingrequest() {
  const { data: pendingData, isLoading, error } = useMyBookingQuery();
  console.log(pendingData);

  return <div>this is pending request page </div>;
}
