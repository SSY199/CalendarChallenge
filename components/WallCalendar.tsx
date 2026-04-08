import React from "react";
import Image from "next/image";

export default function WallCalendar() {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-175">
      <div className="md:w-1/2 relative min-h-75 md:min-h-full">
        <Image
          src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-5xl font-bold tracking-tight">April</h1>
          <p className="text-xl mt-2 font-medium opacity-90">2026</p>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col p-6 md:p-10 bg-gray-50">
        <div className="grow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Select Dates
          </h2>
          <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400">
            Calendar Grid Placeholder
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col pb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Monthly Notes
          </h3>
          <textarea
            className="w-full min-h-35 p-4 rounded-xl border border-gray-200 bg-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Note down your memos for the month here..."
          />
        </div>
      </div>
    </div>
  );
}
