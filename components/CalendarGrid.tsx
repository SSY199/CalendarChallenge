"use client";
import { eachDayOfInterval, startOfWeek, startOfMonth, isSameDay, isSameMonth, addDays, isAfter, isBefore, format } from "date-fns";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onChangeRange: (start: Date | null, end: Date | null) => void;
};

const CalendarGrid = ({ startDate, endDate, onChangeRange }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const daysInGrid = eachDayOfInterval({ start: gridStart, end: addDays(gridStart, 41) });

  const handleClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      onChangeRange(day, null);
    } else {
      if (isBefore(day, startDate)) {
        onChangeRange(day, null);
      } else {
        onChangeRange(startDate, day);
      }
    }
  };

  const isInRange = (day: Date) => {
    if (!startDate || !endDate) return false;
    return isAfter(day, startDate) && isBefore(day, endDate);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">{format(currentDate, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
          <button title="Previous Month" onClick={() => setCurrentDate(addDays(monthStart, -1))} className="p-2 bg-blue-50 dark:bg-neutral-800 rounded-full hover:scale-110 transition">
            <ChevronLeft size={18} className="dark:text-white" />
          </button>
          <button title="Next Month" onClick={() => setCurrentDate(addDays(monthStart, 32))} className="p-2 bg-blue-50 dark:bg-neutral-800 rounded-full hover:scale-110 transition">
            <ChevronRight size={18} className="dark:text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {daysInGrid.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isStart = startDate && isSameDay(day, startDate);
          const isEnd = endDate && isSameDay(day, endDate);
          const inRange = isInRange(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleClick(day)}
              className={`h-10 w-full flex items-center justify-center text-sm transition-all
                ${!isCurrentMonth ? "opacity-20" : "opacity-100"}
                ${inRange ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : ""}
                ${isStart ? "bg-blue-600 text-white font-bold rounded-l-full" : ""}
                ${isEnd ? "bg-blue-600 text-white font-bold rounded-r-full" : ""}
                ${isStart && !endDate ? "rounded-full" : ""}
                ${!isStart && !isEnd && !inRange ? "hover:bg-gray-200 dark:hover:bg-neutral-800 dark:text-white rounded-full" : ""}
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;