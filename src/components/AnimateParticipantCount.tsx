"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import ParticipantIcon from "@/images/participant_icon.svg";

type AnimatedCountProps = {
  participantCount: number;
  capacity: number;
};

export default function AnimatedParticipantCount({ participantCount, capacity }: AnimatedCountProps) {
  // MotionValue 생성 (초기값 0)
  const count = useMotionValue(0);
  // 숫자를 변환하여 정수로 표시
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  // 값이 변경될 때 애니메이션 적용
  useEffect(() => {
    const controls = animate(count, participantCount, { duration: 1, ease: "easeOut" });

    return controls.stop; // 컴포넌트 언마운트 시 애니메이션 중지
  }, [participantCount]);

  return (
    <p className="flex items-center text-sm text-gray-900">
      <ParticipantIcon className="mr-1" />
      <motion.span>{rounded}</motion.span>/{capacity}
    </p>
  );
}
