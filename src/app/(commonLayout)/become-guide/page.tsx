"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/redux/feature/auth/auth.api";
import { useBecomeGuaidMutation } from "@/redux/feature/guaid/guaid.api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, CheckCircle2, User, DollarSign, Compass, AlertCircle, Check } from "lucide-react";
import Loader from "@/helper/loader";

export default function BecomeGuidePage() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useMeQuery();
  const [becomeGuaid, { isLoading: isSubmitting }] = useBecomeGuaidMutation();

  const [expertiseInput, setExpertiseInput] = useState("");
  const [dailyRate, setDailyRate] = useState<number | "">("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const userData = user?.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!userData) {
      router.push(`/login?redirect=/become-guide`);
      return;
    }

    if (!expertiseInput.trim()) {
      setErrorMsg("Please enter at least one area of expertise.");
      return;
    }
    if (!dailyRate || Number(dailyRate) <= 0) {
      setErrorMsg("Please enter a valid daily rate greater than 0.");
      return;
    }

    // Split expertise by comma and trim whitespaces
    const expertise = expertiseInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    try {
      const payload = {
        expertise,
        dailyRate: Number(dailyRate),
      };

      const result = await becomeGuaid(payload).unwrap();
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Become guide request failed:", err);
      setErrorMsg(err?.data?.message || "Failed to create guide profile. Please try again.");
    }
  };

  if (isUserLoading) {
    return <Loader />;
  }



  // Already a guide state
  if (userData?.role === "GUIDE") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4 pt-24">
        <Card className="max-w-md w-full shadow-lg border-green-100">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <CardTitle className="text-xl font-bold">Already a Guide!</CardTitle>
            <CardDescription>
              You already have an active guide profile and are ready to host tours.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm text-gray-600 border">
              <p className="flex justify-between"><strong>Expertise:</strong> <span>{userData.guideInfo?.expertise?.join(", ") || "None"}</span></p>
              <p className="flex justify-between"><strong>Daily Rate:</strong> <span>৳ {userData.guideInfo?.dailyRate} / day</span></p>
            </div>
            <Button onClick={() => router.push("/dashboard")} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 p-4 pt-24">
        <Card className="max-w-md w-full shadow-2xl border-green-200">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Congratulations!</CardTitle>
            <CardDescription className="text-base text-gray-600">
              Your guide profile has been set up successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-500 pb-6">
            Redirecting you to your profile page...
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/40 px-4 py-20 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-8">
        
        {/* Left Column - Benefits & Promo */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Join Our Network
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Become a Local Guide
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Share your city's best kept secrets, meet global travelers, and earn extra income doing what you love.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Flexible Schedule</p>
                  <p className="text-xs text-blue-100">Set your own tour days and working hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Good Earnings</p>
                  <p className="text-xs text-blue-100">Charge your custom daily rate and keep 100% of tips.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Culture Exchange</p>
                  <p className="text-xs text-blue-100">Connect with tourists from diverse backgrounds.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-blue-200 mt-8 pt-4 border-t border-white/10">
            * Guide profiles are visible to all prospective tourists looking for tours in your city.
          </div>
        </div>

        {/* Right Column - Setup Form */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <Card className="shadow-xl border-gray-200/80 rounded-3xl h-full flex flex-col justify-between">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">Guide Profile Setup</CardTitle>
              <CardDescription>
                Fill in the details below to publish your guide card.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* User Identity Preview */}
              {userData ? (
                <div className="flex items-center gap-3 bg-gray-50 border rounded-2xl p-4">
                  <Avatar className="w-12 h-12 border">
                    <AvatarImage src={userData.profilePhoto || "/avatar.png"} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                      {userData.name?.slice(0, 2).toUpperCase() || "US"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{userData.name}</p>
                    <p className="text-xs text-gray-500">{userData.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                      Current: Tourist
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                    G
                  </div>
                  <div>
                    <p className="font-bold text-blue-800 text-sm">Guest Visitor</p>
                    <p className="text-xs text-blue-600">Please sign in to publish your profile.</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 p-3.5 rounded-xl text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                {/* Expertise Field */}
                <div className="space-y-2">
                  <Label htmlFor="expertise" className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-blue-500" />
                    Expertise / Specialties
                  </Label>
                  <Input
                    id="expertise"
                    type="text"
                    placeholder="e.g. Hiking, Local Food, Historic Sites, Photography"
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 py-5"
                    required
                  />
                  <p className="text-[11px] text-gray-400">
                    Separate multiple specialties with commas (e.g. Culture, Trekking, Culinary)
                  </p>
                </div>

                {/* Daily Rate Field */}
                <div className="space-y-2">
                  <Label htmlFor="dailyRate" className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    Daily Rate (৳)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                      ৳
                    </span>
                    <Input
                      id="dailyRate"
                      type="number"
                      min="1"
                      placeholder="e.g. 1500"
                      value={dailyRate}
                      onChange={(e) => setDailyRate(e.target.value !== "" ? Number(e.target.value) : "")}
                      className="pl-7 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 py-5"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Set a competitive daily rate in Taka.
                  </p>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 font-semibold text-sm flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <>Creating Guide Profile...</>
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      Create Guide Profile & Get Started
                    </>
                  )}
                </Button>
              </form>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}