"use client";

import React from "react";
import { Datepicker } from "flowbite-react";

type CustomDatepickerProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
};

export default function CustomDatepicker({ selectedDate, onDateChange }: CustomDatepickerProps) {
  const datepickerTheme = {
    popup: {
      root: {
        inner: "bg-white shadow-none",
      },
      header: {
        title: "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100",
          },
        },
      },
    },
    views: {
      days: {
        header: {
          title: "h-6 text-center text-sm font-bold text-gray-800", // 요일 색상 진하게 변경
        },
        items: {
          item: {
            base: "block flex-1 cursor-pointer rounded-lg text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 ",
            selected: "bg-primary-color text-white hover:bg-blue-8", // 선택된 날짜 색상 변경
            disabled: "text-red-100", // 현재 달이 아닌 날짜 연하게
          },
        },
      },
    },
  };

  const now = new Date();

  return (
    <div>
      <Datepicker
        inline
        value={selectedDate ?? now}
        onChange={onDateChange}
        showClearButton={false}
        showTodayButton={false}
        theme={datepickerTheme}
      />
    </div>
  );
}
