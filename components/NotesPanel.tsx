/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

interface Event {
  id: string;
  time: string;
  task: string;
  date: string;
}

export default function NotesPanel({
  selectedDate,
}: {
  selectedDate: Date | null;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [time, setTime] = useState("09:00");
  const [task, setTask] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("calendar-events");
      if (stored) setEvents(JSON.parse(stored));
    } catch (e) {
      console.error("Invalid JSON in localStorage", e);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("calendar-events", JSON.stringify(events));
    }
  }, [events, isLoaded]);

  //Wall Calendar Aesthetic
  //Integrated Notes Section
  //Fully Responsive Design
  //

  const addEvent = () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }
    if (!task.trim()) {
      toast.error("Please provide a task description");
      return;
    }
    const newEvent: Event = {
      id: crypto.randomUUID(),
      time,
      task: task.trim(),
      date: selectedDate.toDateString(),
    };

    setEvents((prev) => [...prev, newEvent]);
    setTask("");
    toast.success("Task Added", {
      description: `${task.trim()} scheduled for ${time}`,
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (!isLoaded)
      return (
        <div className="animate-pulse bg-gray-100 dark:bg-neutral-800 h-40 rounded-xl" />
      );
  };

  const filteredEvents = events
    .filter((e) => e.date === selectedDate?.toDateString())
    .sort((a, b) => a.time.localeCompare(b.time));

  if (!isLoaded)
    return <div className="animate-pulse bg-gray-100 h-40 rounded-xl" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm">
        <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
          Add Event
        </h4>
        <div className="flex flex-col gap-2">
          <input
            placeholder="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addEvent()}
            className="p-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addEvent}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        <h5 className="text-xs font-semibold text-gray-400 uppercase px-1">
          Agenda: {selectedDate?.toDateString()}
        </h5>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl animate-in fade-in slide-in-from-bottom-2"
            >
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase">
                  {event.time || "No Time"}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {event.task}
                </p>
              </div>
              <button
                title="Delete Event"
                onClick={() => deleteEvent(event.id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm py-4 italic">
            No tasks scheduled.
          </p>
        )}
      </div>
    </div>
  );
}
