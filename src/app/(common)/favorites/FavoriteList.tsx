"use client";

import { useEffect } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Card from "@/components/Card";
import { GatheringType } from "@/types";

type FavoriteListProps = {
  isLoading: boolean;
  favoriteCards: GatheringType[];
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

export default function FavoriteList({
  isLoading,
  favoriteCards,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: FavoriteListProps) {
  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  useEffect(() => {
    if (!isLoading && favoriteCards.length === 0 && hasNextPage) {
      fetchNextPage();
    }
  }, [favoriteCards, hasNextPage, isLoading, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
        <p>모임 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!hasNextPage && favoriteCards.length === 0) {
    return (
      <p className="flex h-[calc(100vh-50vh)] flex-col items-center justify-center text-center text-sm font-medium text-gray-500">
        아직 찜한 모임이 없습니다.
      </p>
    );
  }

  return (
    <>
      {favoriteCards.map((card) => (
        <Card key={card.id} {...card} registrationEnd={card.registrationEnd ?? ""} />
      ))}
      <div ref={observerRef} className="h-10"></div>
    </>
  );
}
