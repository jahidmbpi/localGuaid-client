"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import Image from "next/image";
import photo from "../../../../public/proflio.png";
import { useLogInMutation } from "@/redux/feature/auth/auth.api";
import Password from "@/component/login/password";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [login] = useLogInMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    const result = await login(data).unwrap();
    console.log(result);
    router.push("/");
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className="flex items-center justify-center px-2 min-h-screen">
        <div className="w-full max-w-4xl">
          <div className=" flex items-center justify-center gap-4 flex-col md:flex-row w-full space-y-4">
            <div className="flex-1 space-y-4 w-full md:max-w-md">
              <div className=" items-center justify-center flex mt-10 md:mt-0">
                <h2 className="text-2xl font-sans capitalize font-medium">
                  logIn
                </h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <label className="text-[14px] font-sans text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                    className=" border border-gray-300 rounded-md w-full p-2 text-sm"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[14px] font-sans text-gray-700">
                    Password
                  </label>
                  <Password
                    {...register("password", {
                      required: "Password is required",
                    })}
                  ></Password>
                  {errors.password?.message && (
                    <p className="text-red-500 text-sm">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-400 rounded-md text-gray-700 p-2 mt-2 md:mt-4"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
            <div>
              <Image
                src={photo}
                alt="Login illustration"
                width={400}
                height={400}
                priority
                className=" rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
