"use client";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Password({ ...register }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <input
          className=" border border-gray-300 rounded-md w-full p-2 text-sm"
          placeholder="Password"
          type={isVisible ? "text" : "password"}
          {...register}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
