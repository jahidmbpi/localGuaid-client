"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get("transactionId") || "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50/20 p-4 pt-24 font-sans">
      <Card className="max-w-md w-full shadow-2xl border-red-100 rounded-3xl overflow-hidden transform transition-all hover:scale-[1.01]">
        
        {/* Decorative top pattern */}
        <div className="h-3 bg-gradient-to-r from-red-400 via-rose-500 to-red-600" />
        
        <CardHeader className="text-center pb-2 pt-8">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 border border-red-100 animate-pulse">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Payment Failed
          </CardTitle>
          <CardDescription className="text-base text-gray-500 pt-1">
            Unfortunately, your transaction could not be processed.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 px-6 sm:px-8 space-y-4">
          <div className="bg-red-50/30 border border-red-100/50 rounded-2xl p-5 space-y-3">
            <p className="text-sm text-red-800 leading-relaxed">
              Common reasons include:
            </p>
            <ul className="text-xs text-red-700/80 list-disc list-inside space-y-1">
              <li>Insufficient funds or limit exceeded</li>
              <li>Incorrect card details or validation info</li>
              <li>Network disruption during gateway communication</li>
            </ul>
          </div>

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
            className="w-full bg-red-600 hover:bg-red-700 text-white py-5 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/15"
          >
            <RefreshCw className="w-4 h-4" />
            Go to Bookings & Retry
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

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading transaction status...</p>
      </div>
    }>
      <PaymentFailContent />
    </Suspense>
  );
}
