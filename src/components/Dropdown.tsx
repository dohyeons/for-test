"use client";

import { useState, useRef, useEffect } from "react";
import ArrowDownBlackIcon from "@/images/dropdown_down_arrow_black.svg";
import ArrowDownWhiteIcon from "@/images/dropdown_down_arrow_white.svg";
import { cn } from "@/utils/classnames";

type DropdownProps = {
  options?: string[];
  selected: string;
  onSelect: (option: string) => void;
  onToggle?: (open: boolean) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
};

export default function Dropdown({
  options,
  selected,
  onSelect,
  onToggle,
  placeholder,
  disabled = false,
  className,
  children,
  open,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (!isControlled) {
          setInternalOpen(false);
        }
        onToggle?.(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, isControlled, onToggle]);

  const handleSelect = (option: string) => {
    onSelect(option);
    if (!isControlled) {
      setInternalOpen(false);
    }
    onToggle?.(false);
  };

  return (
    <div className={cn("relative", className ?? "w-28")} ref={dropdownRef}>
      <div
        className={cn(
          "mb-2 flex w-full cursor-pointer items-center justify-between rounded-xl border p-2 text-sm font-medium",
          className,
          isOpen ? "bg-gray-900 text-white" : "bg-gray-50",
          selected ? "text-gray-800" : "",
          disabled && "cursor-not-allowed bg-gray-200",
        )}
        onClick={() => {
          if (!disabled) {
            const newState = !isOpen;
            if (!isControlled) {
              setInternalOpen(newState);
            }
            onToggle?.(newState); // 부모 상태 업데이트
          }
        }}
      >
        <span>{selected || placeholder}</span>
        {isOpen ? <ArrowDownWhiteIcon /> : <ArrowDownBlackIcon />}
      </div>
      {isOpen &&
        (children ??
          (options?.length ? (
            <div className="absolute z-20 w-full rounded-xl border bg-white p-2 text-sm font-medium shadow-md">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="cursor-pointer rounded-xl p-2 text-black hover:bg-sky-100"
                >
                  {option}
                </div>
              ))}
            </div>
          ) : null))}
    </div>
  );
}
