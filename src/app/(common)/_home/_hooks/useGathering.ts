import { useEffect, useMemo } from "react";
import { useFetchGatherings } from "@/app/(common)/_home/_hooks/useFetchGatherings";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const useGatherings = (filters: any) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFetchGatherings(filters);

  const dataFetched = !!data;

  // 마감되지 않은 모임 필터 적용
  const filteredCards = useMemo(
    () =>
      data?.pages
        ?.flatMap((page) => page.data)
        ?.filter((card) => {
          const endDate = dayjs(card.registrationEnd).tz("Asia/Seoul"); // UTC 변환
          const now = dayjs(); // 현재 시간 (로컬 + 9시간 후 UTC 변환)

          return endDate.isValid() && endDate.isAfter(now); // 현재 UTC 시간보다 이후면 유효한 모임
        }) || [],
    [data], // data가 변경될 때만 다시 계산
  );

  // 자동 fetch (다음 페이지가 있다면 fetchNextPage 실행)
  useEffect(() => {
    if (!isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [filteredCards, hasNextPage, isLoading, fetchNextPage]);

  return { filteredCards, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, dataFetched };
};
