"use client";
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

interface Event {
  id: string;
  time: string;
  task: string;
  date: string;
}
let memoryStore: Event[] = [];

export default function NotesPanel({ selectedDate }: { selectedDate: Date | null }) {
  const [events, setEvents] = useState<Event[]>(memoryStore);
  const [time, setTime] = useState("09:00");
  const [task, setTask] = useState("");

  const persist = (updated: Event[]) => {
    const load = () => {
      memoryStore = updated;
      setEvents(updated);
    }
    load();
  };

  const addEvent = () => {
    if (!task.trim() || !selectedDate) return;
    const newEvent: Event = {
      id: crypto.randomUUID(),
      time,
      task: task.trim(),
      date: selectedDate.toDateString(),
    };
    persist([...events, newEvent]);
    setTask("");
    setTime("");
  };

  const deleteEvent = (id: string) => {
    persist(events.filter((e) => e.id !== id));
  };

  const filteredEvents = events
    .filter((e) => e.date === selectedDate?.toDateString())
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm">
        <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
          Add Event
        </h4>
        <div className="flex flex-col gap-2">
          <input
            placeholder="09:00"
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
            disabled={!task.trim() || !selectedDate}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl"
            >
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase">
                  {event.time || "No Time"}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200">{event.task}</p>
              </div>
              <button
                type="button"
                title="Delete"
                onClick={() => deleteEvent(event.id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm py-4">No events for this date.</p>
        )}
      </div>
    </div>
  );
}