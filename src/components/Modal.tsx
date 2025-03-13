"use client";

import Close from "@/images/close.svg";
import { usePreventScroll } from "@/hooks/usePreventScroll";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Modal({ isOpen, onClose, children, closeOnBackdropClick = false, className }: ModalProps) {
  usePreventScroll(isOpen);
  useEscapeKey(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-[38px]"
      role={"dialog"}
      aria-modal={"true"}
      aria-hidden={!isOpen}
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
          onClose();
        }
      }}
    >
      <div className={`relative rounded-lg bg-white p-[24px] shadow-lg ${className || ""}`}>
        <button className="absolute right-[24px] top-[24px] cursor-pointer" aria-label={"모달 닫기"} onClick={onClose}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
}
