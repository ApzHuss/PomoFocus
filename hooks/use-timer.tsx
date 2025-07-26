"use client"
import { useCallback, useEffect, useState } from "react"

type TimerMode = "Focus" | "Break"

// time to minutes
const FocusTime = 0.1
const BreakTime = 5

export default function UseTimer() {
  const [mode, setMode] = useState<TimerMode>("Focus")
  const [timeLeft, setTimeLeft] = useState(mode === "Focus" ? FocusTime * 60 : BreakTime * 60) // minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false)
  const [sessions, setSessions] = useState(0)

  const getDuration = useCallback((mode: TimerMode) => {
    return mode === "Focus" ? FocusTime * 60 : BreakTime * 60 // convert minutes to seconds
  }, [])

  const playNotificationSound = useCallback(() => {
    try {
      const audio = new Audio("/ringtone.mp3")
      audio.volume = 0.5 // Set volume to 50%
      audio.play().catch((e) => {
        console.error("Error playing notification sound:", e)
      })
    } catch (error) {
      console.error("Error creating audio:", error)
    }
  }, [])

  const toggleTimer = () => {
    setIsActive((prev) => !prev)
  }

  const resetTimer = () => {
    setTimeLeft(getDuration(mode))
    setIsActive(false)
  }

  const switchMode = useCallback(() => {
    const newMode = mode === "Focus" ? "Break" : "Focus"
    setMode(newMode)
    setTimeLeft(getDuration(newMode))
    setIsActive(false) // Reset active state when switching modes

    // increment sessions
    if (mode === "Focus") {
      setSessions((prev) => prev + 1)
    }
  }, [mode, getDuration])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer is about to finish
            setIsActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  // Auto-switch mode when timeLeft reaches 0
  useEffect(() => {
    if (timeLeft === 0 && !isActive) {
      // Play notification sound
      playNotificationSound()

      // Switch mode after a short delay to ensure sound plays
      setTimeout(() => {
        switchMode()
      }, 100)
    }
  }, [timeLeft, isActive, switchMode, playNotificationSound])

  return {
    mode,
    setMode,
    timeLeft,
    setTimeLeft,
    toggleTimer,
    isActive,
    resetTimer,
    switchMode,
    sessions,
    setSessions,
  }
}
