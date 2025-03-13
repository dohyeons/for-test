"use client";

import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useFetchGatherings } from "../_home/_hooks/useFetchGatherings";
import FavoriteList from "./FavoriteList";
import ServiceTab from "@/components/ServiceTab";
import FavoritesLogo from "@/images/favorites_logo.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function Page() {
  return (
    <Suspense>
      <FavoritesPage />
    </Suspense>
  );
}

function FavoritesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { favorites } = useFavoritesStore();

  const type = searchParams.get("type") || "DALLAEMFIT";

  const [isFilteringLoading, setIsFilteringLoading] = useState(false);

  useEffect(() => {
    if (!searchParams.get("type")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", "DALLAEMFIT");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFetchGatherings({ type });

  // 모든 카드 가져오기 & 찜한 카드 필터링
  const allCards = data?.pages?.flatMap((page) => page.data) || [];
  const favoriteCards = allCards.filter((card) => favorites.includes(card.id.toString()));
  useEffect(() => {
    if (!isLoading && favoriteCards.length < favorites.length && hasNextPage) {
      fetchNextPage(); // 찜한 모임이 부족하여 추가 데이터 요청 실행
    }
  }, [favoriteCards, favorites, hasNextPage, isLoading]);

  // 필터 업데이트 함수
  const handleFilterChange = useCallback(
    (newType: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newType) {
        params.set("type", newType);
      } else {
        params.delete("type");
      }

      const newParamsString = params.toString();

      if (newParamsString !== searchParams.toString()) {
        setIsFilteringLoading(true); // 필터링 시작
        router.push(`${pathname}?${newParamsString}`);
      }
    },
    [searchParams, router, pathname, isFilteringLoading],
  );

  // URL이 변경되면 필터링 완료 처리
  useEffect(() => {
    setIsFilteringLoading(false);
  }, [searchParams.toString()]);

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-row items-center gap-4 pl-3 pt-10">
        <FavoritesLogo />
        <div>
          <div className="mb-2 text-2xl font-semibold text-gray-900 lg:text-2xl">찜한 모임</div>
          <div className="text-sm font-semibold text-gray-700">마감되기 전에 지금 바로 참여해보세요 👀</div>
        </div>
      </div>
      <div className="mt-6 flex flex-row">
        <ServiceTab
          searchParams={searchParams}
          onCategoryChange={handleFilterChange}
          isFilteringLoading={isFilteringLoading}
        />
      </div>
      <FavoriteList
        isLoading={isLoading}
        favoriteCards={favoriteCards}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
