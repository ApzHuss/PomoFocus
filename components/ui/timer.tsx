"use client"; 

import { Button } from "./button"
import UseTimer from "@/hooks/use-timer"
import { Play, Pause, RotateCcw, ArrowLeftRight } from "lucide-react"

export default function Timer() {
  const { mode, timeLeft, toggleTimer, resetTimer, switchMode, isActive, sessions } = UseTimer()

  console.log(mode)

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60)
  //1m * timeleft = 60s
  //m * timeleft * 60s
  // m - timeleft / 60s
  const seconds = timeLeft % 60
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  return (
    <div className="max-w-xl bg-white shadow-xl w-full p-12 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium capitalize">{mode === "Focus" ? "🎯Focus Time" : "🍩Break Time"}</h2>
        <div className="text-base text-gray-700">Sessions: {sessions}</div>
      </div>
      <div className={`text-5xl font-bold text-center mb-6 ${mode === "Focus" ? "text-amber-700" : "text-indigo-600"}`}>
        {formattedTime}
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <Button
          onClick={toggleTimer}
          className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-300 cursor-pointer flex items-center gap-2"
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={resetTimer}
          className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-300 cursor-pointer flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>
      <Button
        onClick={switchMode}
        className="py-2 w-full bg-gray-100 hover:bg-gray-200 rounded-lg
        text-black cursor-pointer flex items-center justify-center gap-2"
      >
        <ArrowLeftRight size={16} />
        Switch to {mode === "Focus" ? "Break" : "Focus"}
      </Button>
    </div>
  )
}
