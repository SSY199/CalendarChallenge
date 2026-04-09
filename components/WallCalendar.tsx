"use client";
import React, { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { format } from "date-fns";

// Helper function to return seasonal images based on the month
const getSeasonalImage = (date: Date) => {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec

  // Winter: Dec, Jan, Feb
  if (month === 11 || month === 0 || month === 1) {
    return "https://images.unsplash.com/photo-1478719059408-592965723cbc?q=80&w=1000&auto=format&fit=crop"; 
  }
  // Spring: Mar, Apr, May
  if (month >= 2 && month <= 4) {
    return "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop";
  }
  // Summer: Jun, Jul, Aug
  if (month >= 5 && month <= 7) {
    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop";
  }
  // Autumn: Sep, Oct, Nov
  return "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1000&auto=format&fit=crop";
};

export default function WallCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Get the dynamic image based on whatever date is currently selected
  const heroImage = getSeasonalImage(selectedDate);

  return (
    <div className="flex flex-col gap-4 w-full max-w-6xl">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold dark:text-white">Calendar.io</h1>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-175 border dark:border-neutral-800 transition-all duration-500">
        
        {/* Dynamic Hero Image Section */}
        <div
          className="md:w-1/2 relative min-h-75 md:min-h-full bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8 text-white">
            {/* Updates dynamically when you click the calendar */}
            <h2 className="text-5xl font-bold drop-shadow-lg">{format(selectedDate, "EEEE")}</h2>
            <p className="text-xl opacity-90 drop-shadow-md">{format(selectedDate, "MMMM do, yyyy")}</p>
          </div>
        </div>

        <div className="md:w-1/2 p-6 md:p-10 flex flex-col gap-8 bg-gray-50 dark:bg-neutral-950">
          <CalendarGrid onSelectDate={setSelectedDate} selectedDate={selectedDate} />
          <hr className="dark:border-neutral-800" />
          <NotesPanel selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}