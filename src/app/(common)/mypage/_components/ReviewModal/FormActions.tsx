import Button from "@/components/Button";

type FormActionsProps = {
  onCancel: () => void;
  isSubmitDisabled: boolean;
  isPending: boolean;
};

export const FormActions: React.FC<FormActionsProps> = ({ onCancel, isSubmitDisabled, isPending }) => {
  return (
    <div className="flex gap-4">
      <Button className="w-full" styleType={"outline"} onClick={onCancel}>
        취소
      </Button>
      <Button className="w-full" type="submit" disabled={isSubmitDisabled || isPending} loading={isPending}>
        리뷰 등록
      </Button>
    </div>
  );
};
