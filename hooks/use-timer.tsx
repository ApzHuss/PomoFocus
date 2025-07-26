"use client";

import { useCallback, useEffect, useState } from 'react';

type TimerMode = "Focus" | "Break";
// time to minutes
const FocusTime = 0.1;
const BreakTime = 0.1;
export default function UseTimer() {
    const [mode, setMode] = useState<TimerMode>("Focus")
    const [timeLeft, setTimeLeft] = useState(
      mode === "Focus" ? FocusTime * 60 : BreakTime * 60); // minutes in seconds
    const [isActive, setIsActive] = useState<boolean>(false);
    const [sessions, setSessions] = useState (0);

    const getDuration = useCallback((mode: TimerMode) => {
        return mode === "Focus" ? FocusTime * 60 : BreakTime * 60; // convert minutes to seconds
    }, []);

    const toggleTimer = () => {
        setIsActive((prev) => !prev);
    };  
    
    const resetTimer = () => {
        setTimeLeft(getDuration(mode));
        setIsActive(false);
    };

    const switchMode = useCallback(() => {
        const newMode = mode === "Focus" ? "Break" : "Focus";
        setMode(newMode);
        setTimeLeft(getDuration(newMode));
        setIsActive(false); // Reset active state when switching modes

        // increment sessions

        if (mode === "Focus") {
            setSessions((prev) => prev + 1);
        }

    }, [mode, getDuration]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        // Optionally, you can pause or reset here
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, mode]);

    //auto-switch mode when timeLeft reaches 0
    useEffect(() => {
        if (timeLeft === 0) {
            switchMode();
        }
    }, [timeLeft, switchMode]); 

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
  };
}
