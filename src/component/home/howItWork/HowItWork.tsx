"use client";

import { howItWorksData } from "@/component/uitls/cardtItem";

export default function HowItWork() {
  return (
    <div className="max-w-6xl m-auto">
      <div className="items-center mx-auto text-center mt-15">
        <h2 className="text-2xl font-sans font-bold capitalize tracking-tighter">
          How It Works
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-13 mt-5 md:mt-10 p-2">
        {howItWorksData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-400/20 rounded-2xl p-8 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 border  h-full"
          >
            <div className="text-4xl mb-2">
              <item.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold mb-2"> {item.title}</h2>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
