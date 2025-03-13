import { Control, Controller } from "react-hook-form";
import Heart from "@/images/heart.svg";
import { ReviewFormValues } from "@/app/(common)/mypage/_hooks/useReviewForm";

type RatingInputProps = {
  control: Control<ReviewFormValues>;
};

export default function RatingInput({ control }: RatingInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold">만족스러운 경험이었나요?</label>
      <Controller
        name="score"
        control={control}
        rules={{ validate: (value) => value > 0 || "평점은 0점 이상이어야 합니다." }}
        render={({ field }) => (
          <div className="flex">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => field.onChange(score)}
                className={`text-2xl ${field.value >= score ? "animate-heart-scale-up fill-blue-6" : "fill-gray-200"}`}
              >
                <Heart />
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
}
