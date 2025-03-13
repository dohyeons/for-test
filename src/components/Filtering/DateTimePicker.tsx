"use client";

import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import CustomDatepicker from "@/components/Filtering/CustomDatepicker";
import CustomTimepicker from "@/components/Filtering/CustomTimepicker";
import CalendarIcon from "@/images/calendar_icon.svg";

type DateTimePickerProps = {
  selectedDateTime: Date | null;
  onDateTimeChange: (dateTime: Date | null) => void;
};

export default function DateTimePicker({ selectedDateTime, onDateTimeChange }: DateTimePickerProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  // 선택한 날짜, 시간 저장
  const [selectedDate, setSelectedDate] = useState<Date | null>(selectedDateTime);
  const [selectedTime, setSelectedTime] = useState<string>(
    selectedDateTime && dayjs(selectedDateTime).isValid() ? dayjs(selectedDateTime).format("HH:mm") : "12:00",
  );

  // 외부 클릭 시 드롭다운 닫힘
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateDateTime = (newDate: Date | null, newTime: string) => {
    if (!newDate) return; // 유효하지 않은 날짜는 업데이트하지 않음

    const [hours, minutes] = newTime.split(":").map(Number);
    const newDateTime = new Date(newDate);
    newDateTime.setHours(hours);
    newDateTime.setMinutes(minutes);

    if (dayjs(newDateTime).isValid()) {
      onDateTimeChange(newDateTime);
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    if (selectedDate?.toISOString() !== newDate?.toISOString()) {
      setSelectedDate(newDate);
      updateDateTime(newDate, selectedTime);
    }
  };

  const handleTimeChange = (newTime: string) => {
    if (selectedTime !== newTime) {
      setSelectedTime(newTime);
      if (selectedDate) {
        updateDateTime(selectedDate, newTime);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 날짜 & 시간 선택 필드 */}
      <div
        className={`flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-2 ${
          selectedDateTime && dayjs(selectedDateTime).isValid() ? "text-gray-900" : "text-gray-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-4">
          {selectedDateTime && dayjs(selectedDateTime).isValid()
            ? dayjs(selectedDateTime).format("YYYY-MM-DD HH:mm")
            : "날짜 & 시간 선택"}
        </span>
        <CalendarIcon />
      </div>

      {/* 드롭다운 (Datepicker + Timepicker) */}
      {isOpen && (
        <div className="absolute bottom-full left-1/2 top-auto z-10 my-2 -translate-x-1/2 rounded-lg border bg-white pb-4 shadow-md max-md:translate-y-36">
          <div className="flex flex-col overflow-hidden rounded-lg bg-white sm:flex-row">
            {/* 날짜 선택 */}
            <CustomDatepicker selectedDate={selectedDate} onDateChange={handleDateChange} />
            {/* 시간 선택 */}
            <CustomTimepicker selectedTime={selectedTime} onTimeChange={handleTimeChange} />
          </div>
        </div>
      )}
    </div>
  );
}
