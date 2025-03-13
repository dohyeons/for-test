import { MyGathering } from "@/app/(common)/mypage/types";
import { GatheringType, ReviewResponse } from "@/types";
import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";

type GatheringListProps<T extends MyGathering | ReviewResponse | GatheringType> = {
  render: (item: T) => React.ReactNode;
  emptyMessage: string;
  queryOption: UseSuspenseQueryOptions<T[], Error>;
};

export default function MypageList<T extends MyGathering | ReviewResponse | GatheringType>({
  render,
  emptyMessage,
  queryOption,
}: GatheringListProps<T>) {
  const { data, error } = useSuspenseQuery({ ...queryOption, staleTime: 300000 });

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>목록 조회 중 에러가 발생했습니다.</p>
      </div>
    );
  }
  return (
    <>
      {data.length ? (
        <>{data.map((gathering) => render(gathering))}</>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p>{emptyMessage}</p>
        </div>
      )}
    </>
  );
}
