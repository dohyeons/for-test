import Heart from "@/images/heart.svg";

type ScoreProps = {
  score: number;
};

export default function Score({ score }: ScoreProps) {
  const fullHearts = Math.floor(score); // 완전한 하트 개수
  const hasHalfHeart = score - fullHearts >= 0.5; // 반쪽 하트 여부

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, index) => {
        if (index < fullHearts) {
          return <Heart key={index} className="fill-red-600 stroke-none" />;
        } else if (index === fullHearts && hasHalfHeart) {
          return (
            <svg key={index} viewBox="0 0 22 19" className="h-[19px] w-[22px]">
              <defs>
                <linearGradient id={`half-fill-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="rgb(220 38 38)" /> {/* 빨간색 */}
                  <stop offset="50%" stopColor="rgb(229 231 235)" /> {/* 회색 */}
                </linearGradient>
              </defs>
              <Heart fill={`url(#half-fill-${index})`} className="stroke-none" />
            </svg>
          );
        } else {
          return <Heart key={index} className="fill-gray-200 stroke-none" />;
        }
      })}
    </div>
  );
}
