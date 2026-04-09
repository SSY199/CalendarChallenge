"use client";
import { eachDayOfInterval, startOfWeek, startOfMonth, isSameDay, isSameMonth, addDays } from "date-fns";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";


type Props = {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
};

const CalendarGrid = ({ onSelectDate, selectedDate }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const prevMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

  const monthStart = startOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const startDateToDisplay = startOfWeek(monthStart, { weekStartsOn: 0 });

  const daysInGrid = eachDayOfInterval({ start: startDateToDisplay, end: addDays(gridStart, 41) });

  const handleClick = (day: Date) => {
    onSelectDate(day); 
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <div className="flex gap-2">
          <button title="Previous Month" type="button" onClick={prevMonth} className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700 bg-amber-50 rounded-full">
            <ChevronLeft size={18} />
          </button>
          <button title="Next Month" type="button" onClick={nextMonth} className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700 bg-amber-50 rounded-full">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2 text-center text-xs font-semibold text-gray-500 uppercase">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {daysInGrid.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

          return (
            <button
              key={day.toString()}
              onClick={() => handleClick(day)}
              type="button"
              aria-label={`Select ${format(day, "MMMM d, yyyy")}`}
              className={`
                h-10 w-full flex items-center justify-center rounded-full text-sm transition
                ${isCurrentMonth ? "text-gray-700 dark:text-gray-200" : "text-gray-300 dark:text-gray-600"}
                ${isSelected ? "bg-blue-600 text-white font-bold hover:bg-blue-700" : "hover:bg-gray-100 dark:hover:bg-neutral-700"}
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