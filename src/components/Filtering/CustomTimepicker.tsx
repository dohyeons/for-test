"use client";

import React, { useState, useEffect } from "react";

type TimepickerProps = {
  selectedTime: string | null;
  onTimeChange: (time: string) => void;
};

export default function CustomTimepicker({ selectedTime, onTimeChange }: TimepickerProps) {
  const [time, setTime] = useState<string>(selectedTime || "09:00"); // 기본값 설정

  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1~12시
  const minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
  const periods = ["AM", "PM"];

  useEffect(() => {
    onTimeChange(time);
  }, [time, onTimeChange]);

  const handleTimeSelect = (hour: number, minute: string, period: string) => {
    let adjustedHour = hour;
    if (period === "PM" && hour !== 12) adjustedHour += 12;
    if (period === "AM" && hour === 12) adjustedHour = 0;

    const newTime = `${adjustedHour.toString().padStart(2, "0")}:${minute}`;

    setTime(`${hour.toString().padStart(2, "0")}:${minute} ${period}`);
    onTimeChange(newTime);
  };

  return (
    <div className="p-4">
      <p className="mb-1 text-sm font-medium text-gray-900">시간 선택:</p>

      <div className="flex justify-between gap-2 rounded-lg bg-gray-50 p-2 shadow-md">
        {/* 시간 선택 */}
        <div className="flex max-h-48 w-16 flex-col overflow-auto">
          {hours.map((hour) => (
            <button
              type="button"
              key={hour}
              className={`p-1 text-sm ${
                time.startsWith(hour.toString().padStart(2, "0"))
                  ? "rounded-lg bg-primary-color text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleTimeSelect(hour, time.split(":")[1].split(" ")[0], time.split(" ")[1])}
            >
              {hour}
            </button>
          ))}
        </div>

        {/* 분 선택 */}
        <div className="flex max-h-48 w-16 flex-col overflow-auto">
          {minutes.map((minute) => (
            <button
              type="button"
              key={minute}
              className={`p-1 text-sm ${time.includes(`:${minute}`) ? "rounded-lg bg-primary-color text-white" : "hover:bg-gray-200"}`}
              onClick={() => handleTimeSelect(Number(time.split(":")[0]), minute, time.split(" ")[1])}
            >
              {minute}
            </button>
          ))}
        </div>

        {/* AM / PM 선택 */}
        <div className="flex max-h-48 w-16 flex-col overflow-auto">
          {periods.map((period) => (
            <button
              type="button"
              key={period}
              className={`p-1 text-sm ${time.includes(period) ? "rounded-lg bg-primary-color text-white" : "hover:bg-gray-200"}`}
              onClick={() => handleTimeSelect(Number(time.split(":")[0]), time.split(":")[1].split(" ")[0], period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
