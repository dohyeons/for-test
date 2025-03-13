"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/classnames";
import Spinner from "@/components/Spinner";

type ButtonProps = {
  styleType?: "solid" | "outline";
  size?: "sm" | "lg";
  loading?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  styleType = "solid",
  size = "sm",
  loading = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const baseStyles =
    "py-[10px] inline-flex items-center justify-center rounded-[12px] font-semibold disabled:cursor-not-allowed";

  const variantStyles = {
    solid: "bg-blue-6 text-white hover:bg-blue-7 active:bg-blue-8 disabled:bg-mono-6",
    outline:
      "border border-blue-6 text-blue-6 hover:border-blue-7 hover:text-blue-7 active:text-blue-8 active:border-blue-8 disabled:border-mono-6 disabled:text-mono-6",
  };

  const sizeStyles = {
    sm: "text-sm",
    lg: "text-base",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[styleType], sizeStyles[size], className)}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <Spinner color={styleType === "solid" ? "white" : "gray"} /> : <>{children}</>}
    </button>
  );
}
