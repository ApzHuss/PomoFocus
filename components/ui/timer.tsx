"use client";

import React from 'react'
import { Button } from './button';

export default function Timer() {
    return (
    <div className="max-w-sm bg-white shadow-xl w-full p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium capitalize ">Focus Time</h2>
            <div className="text-sm text-gray-500">Sessions: 0</div>
        </div>

        <div className="text-center text-6xl font-bold mb-4 text-amber-700">25:00</div>

        <div className="flex justify-center space-x-4 mb-4">
            <Button className="bg-yellow-500 px-5 py-2 rounded-lg text-white hover:bg-yellow-600 cursor-pointer">Pause</Button>
            <Button className="bg-gray-200 px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-300 cursor-pointer">Reset</Button>
        </div>
    </div>
);

}