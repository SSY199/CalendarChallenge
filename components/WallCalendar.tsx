"use client";
import React, { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { format } from "date-fns";

export default function WallCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col gap-4 w-full max-w-6xl">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold dark:text-dark">Calendar.io</h1>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-175 border dark:border-neutral-800">
        <div
          className="md:w-1/2 relative min-h-75 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-5xl font-bold">{format(new Date(), "EEEE")}</h2>
            <p className="text-xl opacity-80">{format(new Date(), "MMMM do, yyyy")}</p>
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