import { useGatherings } from "@/app/(common)/_home/_hooks/useGathering";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Card from "@/components/Card";
import { FiltersType } from "@/types";

const GatheringList = ({ filters }: { filters: FiltersType }) => {
  const { filteredCards, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGatherings(filters);
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
        <p>모임 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!hasNextPage && filteredCards.length === 0) {
    return (
      <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
        <p>아직 모임이 없어요</p>
        <p className="mt-2">지금 바로 모임을 만들어보세요</p>
      </div>
    );
  }

  return (
    <>
      {filteredCards.map((card) => (
        <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
      ))}
      <div ref={observerRef} className="h-10"></div>
    </>
  );
};

export default GatheringList;
