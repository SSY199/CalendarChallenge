# Calendar.io - Interactive Wall Calendar Component

A polished, high-performance interactive calendar built as part of the **takeUforward SWE Summer Intern** challenge. This project translates a physical wall calendar aesthetic into a fully responsive, feature-rich web component with a strong focus on UX and layout stability.

## 🚀 Live Demo
[(https://calendar-challenge-omega.vercel.app/)]


## ✨ Key Features

- **Wall Calendar Aesthetic:** A balanced UI featuring a prominent hero image that serves as a visual anchor for the monthly grid, shifting dynamically based on screen size.
- **Fixed 42-Day Grid Architecture:** Implemented a constant 6-week display logic to ensure zero layout shift when navigating between months of different lengths.
- **Event Management & Persistence:** Add specific tasks with time-stamping to any selected date. All data is reliably saved to the browser's `localStorage` using React `useEffect` hooks for full data persistence across sessions.
- **Professional Toast Notifications:** Integrated `sonner` to provide reliable, non-intrusive feedback when users add or delete events, bypassing flaky native browser notification permissions.
- **Responsive:** Fully optimized for Mobile and Desktop layouts with a built-in, state-driven Theme Toggle.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Date Logic:** `date-fns`
- **Icons:** Lucide React
- **Notifications:** ShadCn UI(Sonner)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/SSY199/calendar-challenge.git]
2. **Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.

🧠 Design & Engineering Decisions
Modular Architecture: I broke the UI into highly focused, separate components (CalendarGrid, NotesPanel, ThemeToggle, WallCalendar) to ensure maintainability, clean prop drilling, and separation of concerns.

Strictly Frontend: As per the requirements, I avoided building a heavy backend database. Instead, I engineered a robust client-side storage solution using localStorage combined with hydration-safe React patterns.

UX over Flash: I prioritized functional feedback (toast notifications, disabled button states, empty data states) to ensure the user always understands what the system is doing.