"use client";
import React, { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { format } from "date-fns";

const getSeasonalImage = (date: Date) => {
  const month = date.getMonth();
  if (month === 11 || month === 0 || month === 1) 
    return "https://images.unsplash.com/photo-1478719059408-592965723cbc?q=80&w=1000";
  if (month >= 2 && month <= 4) 
    return "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000";
  if (month >= 5 && month <= 7) 
    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000";
  return "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1000";
};

export default function WallCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const heroImage = getSeasonalImage(selectedDate);

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    if (start) setSelectedDate(start); // Updates Hero image & Notes header
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold dark:text-white">Calendar.io</h1>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-175 border dark:border-neutral-800 transition-all">
        {/* Dynamic Hero Section */}
        <div
          className="md:w-1/2 relative min-h-75 md:min-h-full bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-5xl font-bold drop-shadow-lg">{format(selectedDate, "EEEE")}</h2>
            <p className="text-xl opacity-90">{format(selectedDate, "MMMM do, yyyy")}</p>
          </div>
        </div>

        {/* Calendar & Logic Section */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col gap-8 bg-gray-50 dark:bg-neutral-950">
          <CalendarGrid 
            startDate={startDate} 
            endDate={endDate} 
            onChangeRange={handleRangeChange} 
          />
          <hr className="dark:border-neutral-800" />
          <NotesPanel selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}