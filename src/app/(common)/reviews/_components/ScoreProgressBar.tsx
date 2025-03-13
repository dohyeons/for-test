import ProgressBar from "@/components/ProgressBar";

type ScoresProgressBarProps = {
  score: number;
  stars: number;
  total: number;
};

export default function ScoreProgressBar({ score, stars, total }: ScoresProgressBarProps) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium">
      <span className="whitespace-nowrap">{score}점</span>
      <ProgressBar progress={(stars / total) * 100} />
      <span className="text-gray-400">{stars}</span>
    </div>
  );
}
