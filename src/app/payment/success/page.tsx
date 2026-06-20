"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Calendar, CreditCard, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("transactionId") || "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-green-50/20 p-4 pt-24 font-sans">
      <Card className="max-w-md w-full shadow-2xl border-green-100 rounded-3xl overflow-hidden transform transition-all hover:scale-[1.01]">
        
        {/* Decorative top pattern */}
        <div className="h-3 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
        
        <CardHeader className="text-center pb-2 pt-8">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 border border-green-100 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-base text-gray-500 pt-1">
            Thank you. Your transaction has been processed.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 px-6 sm:px-8 space-y-5">
          <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-3">
              <span className="text-gray-500 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-green-600" />
                Transaction ID
              </span>
              <span className="font-mono font-bold text-gray-800 break-all pl-4 text-right">
                {transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-3">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-green-600" />
                Date & Time
              </span>
              <span className="font-semibold text-gray-800">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Payment Status
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                PAID
              </span>
            </div>

          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pb-8 pt-4 px-6 sm:px-8">
          <Button 
            onClick={() => router.push("/dashboard/myBooking")} 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-5 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/15"
          >
            Go to My Bookings
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full py-5 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50">
              Return Home
            </Button>
          </Link>
        </CardFooter>

      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading transaction status...</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
