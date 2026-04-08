"use client";
import { eachDayOfInterval } from "date-fns";
import { 
  endOfMonth, 
  endOfWeek, 
  startOfMonth, 
  startOfWeek, 
  isSameDay, 
  isSameMonth, 
  isWithinInterval 
} from "date-fns";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const nextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDateToDisplay = startOfWeek(monthStart);
  const endDateToDisplay = endOfWeek(monthEnd);
  // const startDay = getDay(monthStart);
  // const daysInMonth = getDaysInMonth(currentDate);

  const daysInGrid = eachDayOfInterval({
    start: startDateToDisplay,
    end: endDateToDisplay,
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-200 rounded-full transition"
            type="button"
            aria-label="Go to previous month"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-200 rounded-full transition"
            type="button"
            aria-label="Go to next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {daysInGrid.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isStart = startDate ? isSameDay(day, startDate) : false;
          const isEnd = endDate ? isSameDay(day, endDate) : false;
          const isBetween =
            startDate && endDate
              ? isWithinInterval(day, { start: startDate, end: endDate })
              : false;

          // Dynamic Tailwind classes for the UI states
          let buttonClasses =
            "h-10 w-full flex items-center justify-center text-sm transition-all ";

          if (!isCurrentMonth) buttonClasses += "text-gray-300 ";
          else buttonClasses += "text-gray-700 hover:bg-gray-100 ";

          if (isStart || isEnd)
            buttonClasses +=
              "bg-blue-600 text-white hover:bg-blue-700 font-bold ";
          if (isStart) buttonClasses += "rounded-l-full ";
          if (isEnd) buttonClasses += "rounded-r-full ";
          if (isStart && !endDate) buttonClasses += "rounded-full "; // If only start is selected

          if (isBetween && !isStart && !isEnd)
            buttonClasses += "bg-blue-100 text-blue-800 ";

          return (
            <button
              key={day.toString()}
              onClick={() => handleDateClick(day)}
              className={buttonClasses}
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
