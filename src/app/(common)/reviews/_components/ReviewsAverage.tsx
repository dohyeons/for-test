import { fetchReviewsScores } from "../_utils/api";
import ScoreProgressBar from "./ScoreProgressBar";
import Score from "@/components/Score";

export default async function ReviewsAverage() {
  const [scores] = await fetchReviewsScores();

  const { averageScore, oneStar, twoStars, threeStars, fourStars, fiveStars } = scores;
  const total = oneStar + twoStars + threeStars + fourStars + fiveStars;
  const stars = [fiveStars, fourStars, threeStars, twoStars, oneStar];

  return (
    <div className="flex w-full max-w-[995px] justify-center border-y-2 border-gray-200 bg-white px-6 py-8">
      <div className="flex w-full max-w-[610px] justify-between">
        <div className="flex flex-col items-center justify-center gap-2 pr-5">
          <div className="flex items-center justify-center text-xl font-semibold md:text-2xl">
            <span>{averageScore}</span>
            <span className="text-gray-400">/5</span>
          </div>
          <Score score={averageScore} />
        </div>

        <div className="flex max-w-[302px] flex-1 flex-col gap-1">
          {stars.map((count, index) => (
            <ScoreProgressBar key={index} score={5 - index} stars={count} total={total} />
          ))}
        </div>
      </div>
    </div>
  );
}
