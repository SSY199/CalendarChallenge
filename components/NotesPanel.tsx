"use client";

import React, { useEffect, useState } from "react";

const NotesPanel = () => {
  const [note, setNote] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadNotes = () => {
      const saved = localStorage.getItem("calendar-monthly-note");
      if (saved) setNote(saved);
      setIsLoaded(true);
    };

    loadNotes();
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem("calendar-monthly-note", newNote); // Save note to localStorage
  };
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <textarea
      value={note}
      onChange={handleNoteChange}
      className="w-full min-h-35 p-4 rounded-xl border border-gray-200 bg-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      placeholder="Note down your memos for the month here..."
    />
  );
};

export default NotesPanel;
