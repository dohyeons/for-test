import { ReviewFormValues } from "@/app/(common)/mypage/_hooks/useReviewForm";
import { Control, Controller, FieldErrors } from "react-hook-form";

type CommentInputProps = {
  control: Control<ReviewFormValues>;
  errors: FieldErrors<ReviewFormValues>;
  commentLength: number;
};

export default function CommentInput({ control, errors, commentLength }: CommentInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <label className="font-semibold">경험에 대해 남겨주세요.</label>
        <span className="text-gray-300">{commentLength}/250</span>
      </div>
      <Controller
        name="comment"
        control={control}
        rules={{
          required: "리뷰를 작성해주세요",
          maxLength: { value: 250, message: "리뷰는 250자 이하로 작성해주세요" },
          validate: (value) => value.trim() === value || "앞뒤 공백을 지워주세요",
        }}
        render={({ field }) => (
          <textarea
            {...field}
            maxLength={250}
            className="h-[120px] resize-none border-none bg-gray-50 px-4 pt-2.5 placeholder:text-gray-400"
            placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
          />
        )}
      />
      {errors.comment && <p className="mt-1 text-sm font-semibold text-red-600">{errors.comment.message}</p>}
    </div>
  );
}
