import { House } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      {/* Floating background shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <span className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-blue-200/20 animate-bounce-slow dark:bg-blue-500/10"></span>
        <span className="absolute top-40 right-1/3 w-40 h-40 rounded-full bg-pink-200/20 animate-bounce-slower dark:bg-pink-500/10"></span>
      </div>

      {/* 404 Title */}
      <h1 className="relative z-10 text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-500 dark:to-pink-500 animate-pulse text-center sm:text-[8rem] xs:text-[6rem]">
        404
      </h1>

      {/* Message */}
      <p className="relative z-10 mt-6 text-center text-xl text-gray-700 dark:text-gray-300 max-w-lg sm:text-lg">
        Oops! The page you are looking for does not exist. <br />
        It might have been moved or deleted.
      </p>

      {/* Back Home Button */}
      <Link
        href="/"
        className="relative z-10 mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {/* Home Icon */}
        <House />
        Go Back Home
      </Link>

      {/* Optional small footer */}
      <p className="relative z-10 mt-6 text-sm text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} loacGuaid. All rights reserved.
      </p>
    </div>
  );
}
