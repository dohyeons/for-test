"use client";

import Modal from "@/components/Modal";
import CreateGatheringForm from "./CreateGatheringForm";

type CreateGatheringsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateGatheringsModal({ isOpen, onClose }: CreateGatheringsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex max-h-screen w-full flex-col max-sm:fixed max-sm:overflow-auto md:h-auto md:max-w-[520px] [&::-webkit-scrollbar]:hidden"
    >
      <label className="mb-3 text-lg font-semibold">모임 만들기</label>
      <CreateGatheringForm onClose={onClose} />
    </Modal>
  );
}
