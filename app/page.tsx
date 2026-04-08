import WallCalendar from '@/components/WallCalendar';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <WallCalendar />
      </div>
    </main>
  );
}