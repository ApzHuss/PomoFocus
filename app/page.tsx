import Timer from "@/components/ui/timer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen
     bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Simple Pomodoro Timer</h1>
      <Timer />
    </div>
  );
}
