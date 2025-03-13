import { Popup } from "@/components/Popup";
import { useLeaveGathering } from "@/hooks/useLeaveGathering";
import { useState } from "react";

type CancelConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  gatheringId: number;
  handleModalClose: () => void;
};
export default function CancelConfirmModal({
  isOpen,
  onClose,
  gatheringId,
  handleModalClose,
}: CancelConfirmModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mutation = useLeaveGathering(["user", "gatherings"]);
  const handleErrorModalClose = () => {
    setIsModalOpen(false);
  };
  const handleCancelGathering = () => {
    mutation.mutate(gatheringId as number, {
      onSuccess: () => {
        handleModalClose();
      },
      onError: () => {
        setIsModalOpen(true);
      },
    });
  };

  return (
    <>
      <Popup isOpen={isOpen} onClose={onClose} type="confirm" onClick={handleCancelGathering}>
        예약을 취소하시겠어요?
      </Popup>
      <Popup isOpen={isModalOpen} onClose={handleErrorModalClose} onClick={handleErrorModalClose} type="alert">
        에러: {mutation.error?.message}
      </Popup>
    </>
  );
}
