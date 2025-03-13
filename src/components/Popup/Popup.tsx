import Button from "@/components/Button";
import Modal from "@/components/Modal";

type PopupProps = {
  isOpen: boolean;
  type: "alert" | "confirm";
  onClick: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Popup({ isOpen, type = "alert", onClose, onClick, children }: PopupProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-[450px]">
      <div className="flex h-[151px] w-full flex-col items-center justify-between text-base font-medium">
        <div className="flex flex-1 flex-col items-center justify-center">{children}</div>
        <div className="flex w-full justify-center gap-2">
          {type === "confirm" && (
            <Button styleType="outline" onClick={onClose} className="w-full max-w-[120px]">
              취소
            </Button>
          )}
          <Button onClick={onClick} className="w-full max-w-[120px]">
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}
