"use client";

import { useState } from "react";
import Image from "next/image";
import Edit from "@/images/edit.svg";
import { cn } from "@/utils/classnames";

type AvatarProps = {
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg";
  isEdit?: boolean;
};

export default function Avatar({ imageUrl, size = "md", isEdit = false }: AvatarProps) {
  const [isError, setIsError] = useState(false);
  const DEFAULT_IMAGE = "/images/profile.svg";

  const baseStyle = "relative  rounded-full";

  const sizeStyles = {
    sm: "size-[29px]",
    md: "size-10",
    lg: "size-14",
  };

  return (
    <div className={cn(baseStyle, sizeStyles[size])}>
      <Image
        src={isError || !imageUrl ? DEFAULT_IMAGE : imageUrl}
        alt={"프로필 이미지"}
        fill
        sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
        className={"overflow-hidden rounded-full"}
        onError={() => setIsError(true)}
      />
      {isEdit && <Edit className="absolute left-9 top-9 size-[18px] text-white" />}
    </div>
  );
}
