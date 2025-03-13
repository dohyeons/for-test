"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useCheckAuth = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  // 로그인 상태 체크 함수
  const checkAuth = (callback?: () => void) => {
    if (user) {
      // 로그인 상태일 때 콜백 (모달 열기)
      if (callback) callback();
    } else {
      // 로그인이 안됐을 때
      saveAuthModalState(true); // "로그인 후 모달을 다시 열어야 한다"는 정보 저장
      setAuthModalOpen(true); // "로그인이 필요합니다" 모달 열기
    }
  };

  // 모달 확인 버튼 클릭 시 로그인 페이지로 이동
  const handleConfirm = () => {
    setAuthModalOpen(false); // 모달 닫기
    router.push("/sign-in"); // 로그인 페이지로 이동
  };
  return {
    checkAuth,
    isLogin: !!user,
    isAuthModalOpen,
    setAuthModalOpen,
    handleConfirm,
  };
};

// 모달 상태 저장
export const saveAuthModalState = (isOpen: boolean) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("authModalOpen", JSON.stringify(isOpen));
  }
};

// 로그인 후 모달 상태 복원
export const restoreAuthModalState = (): boolean => {
  if (typeof window !== "undefined") {
    const storedValue = sessionStorage.getItem("authModalOpen");
    return storedValue ? JSON.parse(storedValue) : false;
  }
  return false;
};

// 모달 상태 초기화
export const clearAuthModalState = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("authModalOpen");
  }
};
