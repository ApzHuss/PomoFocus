"use client";

import React from 'react'
import { Button } from './button';
import UseTimer from '@/hooks/use-timer';

export default function Timer() {
    const { timeLeft, toggleTimer, resetTimer, isActive } = UseTimer();

    // Format time as MM:SS
    const minutes = Math.floor(timeLeft / 60);
    //1m * timeleft = 60s
    //m * timeleft * 60s
    // m - timeleft / 60s
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return (
    <div className="max-w-xl bg-white shadow-xl w-full p-12 rounded-xl">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium capitalize">Focus Time</h2>
            <div className="text-base text-gray-700">Sessions: 0</div>
            </div>

        <div className="text-center text-6xl font-bold mb-8 text-amber-700">
            {formattedTime}
        </div>

        <div className="flex justify-center space-x-4 mb-4">
            <Button onClick={toggleTimer} className="bg-yellow-500 px-5 py-2 rounded-lg text-white hover:bg-yellow-600 cursor-pointer">
                {isActive ? "Pause" : "Start"}{" "}
                </Button>
            <Button onClick={resetTimer} className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-300 cursor-pointer">
                Reset</Button>
        </div>
        <Button className="py-2 w-full bg-gray-100 hover:bg-gray-200 rounded-lg text-black cursor-pointer">
            Switch to Break
        </Button>
    </div>
);

}