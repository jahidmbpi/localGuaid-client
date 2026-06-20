"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Calendar, UserCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("transactionId") || "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-amber-50/10 p-4 pt-24 font-sans">
      <Card className="max-w-md w-full shadow-2xl border-amber-100 rounded-3xl overflow-hidden transform transition-all hover:scale-[1.01]">
        
        {/* Decorative top pattern */}
        <div className="h-3 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500" />
        
        <CardHeader className="text-center pb-2 pt-8">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <AlertTriangle className="w-12 h-12 text-amber-500" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Payment Cancelled
          </CardTitle>
          <CardDescription className="text-base text-gray-500 pt-1">
            You have cancelled the payment flow.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 px-6 sm:px-8 space-y-4">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            No charges were made to your account. You can complete this booking whenever you are ready.
          </p>

          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 flex justify-between items-center text-sm">
            <span className="text-gray-500">Transaction ID Reference</span>
            <span className="font-mono font-bold text-gray-700 truncate pl-4 max-w-[180px]">
              {transactionId}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pb-8 pt-4 px-6 sm:px-8">
          <Button 
            onClick={() => router.push("/dashboard/myBooking")} 
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-5 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15"
          >
            Go to My Bookings
          </Button>

          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full py-5 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </CardFooter>

      </Card>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading transaction status...</p>
      </div>
    }>
      <PaymentCancelContent />
    </Suspense>
  );
}
