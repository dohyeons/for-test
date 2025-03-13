import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { fetchGatherings } from "@/app/(common)/_home/_hooks/useFetchGatherings";
import CardList from "./_home/CardList";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();

  // 서버에서 초기에 10개의 데이터를 패칭해서 캐싱
  await queryClient.prefetchQuery({
    queryKey: ["gatherings", { limit: 10, offset: 0 }],
    queryFn: () => fetchGatherings({ pageParam: 0, filters: {} }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="w-full">
      <Suspense>
        <HydrationBoundary state={dehydratedState}>
          <CardList />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
