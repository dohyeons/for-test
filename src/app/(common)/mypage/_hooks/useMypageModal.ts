import { useState } from "react";

export default function useMypageModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState<number | null>(null);

  const handleOpen = (gatheringId: number) => {
    setSelectedGathering(gatheringId);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    selectedGathering,
    handleOpen,
    handleClose,
  };
}
