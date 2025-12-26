"use client";
import { choseUsItem } from "@/component/uitls/choseItem";

export default function WhyChooseUs() {
  return (
    <div className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 font-sans">Why Choose Us</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-sm">
          Discover why travelers trust us for unforgettable experiences, guided
          by professionals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {choseUsItem.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow text-center"
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
