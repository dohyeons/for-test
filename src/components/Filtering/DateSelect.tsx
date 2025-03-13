"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import CustomDatepicker from "@/components/Filtering/CustomDatepicker";
import dayjs from "dayjs";
import Dropdown from "@/components/Dropdown";

type DateSelectProps = {
  onDateChange: (date: Date | null) => void; // 부모 컴포넌트로 전달할 함수 추가
};

export default function DateSelect({ onDateChange }: DateSelectProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null); // 임시 날짜 저장
  const [isDateDropdownOpen, setDateDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDateDropdownOpen) {
      setTempSelectedDate(selectedDate);
    }
  }, [isDateDropdownOpen, selectedDate]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <Dropdown
        open={isDateDropdownOpen}
        selected={selectedDate ? dayjs(selectedDate).format("YY/MM/DD") : "날짜 선택"}
        onSelect={() => setDateDropdownOpen(!isDateDropdownOpen)}
        onToggle={setDateDropdownOpen}
        placeholder="날짜 선택"
      >
        {/* 날짜 선택 */}
        {isDateDropdownOpen && (
          <div className="absolute z-20 rounded-xl border bg-white px-10 pb-6 shadow-md">
            <CustomDatepicker selectedDate={tempSelectedDate} onDateChange={setTempSelectedDate} />
            {/* 버튼 */}
            <div className="mt-3 flex justify-center gap-2">
              <Button
                type="button"
                styleType="outline"
                size="sm"
                className="h-10 w-[118px]"
                onClick={() => {
                  setSelectedDate(null);
                  onDateChange(null);
                  setDateDropdownOpen(false);
                }}
              >
                초기화
              </Button>
              <Button
                type="button"
                styleType="solid"
                size="sm"
                className="h-10 w-[118px]"
                disabled={!tempSelectedDate} // 날짜가 선택되지 않으면 비활성화
                onClick={() => {
                  setSelectedDate(tempSelectedDate);
                  onDateChange(tempSelectedDate);
                  setDateDropdownOpen(false);
                }}
              >
                적용
              </Button>
            </div>
          </div>
        )}
      </Dropdown>
    </div>
  );
}
