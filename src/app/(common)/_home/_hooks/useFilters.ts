"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback, useState, useEffect } from "react";
import { FiltersType } from "@/types";

export const useFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsString = searchParams.toString();

  const [isFilteringLoading, setIsFilteringLoading] = useState(false); // 필터링 로딩 상태 추가

  // searchParams에서 필터 값을 추출
  const filters: FiltersType = useMemo(() => {
    return {
      location: searchParams.get("location") || undefined,
      date: searchParams.get("date") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      type: searchParams.get("type") || "DALLAEMFIT",
    };
  }, [searchParamsString]);

  // 필터를 업데이트 : searchParamsString을 사용하여 불필요한 재생성 방지
  const handleFilterChange = useCallback(
    (newFilter: Partial<typeof filters>) => {
      const params = new URLSearchParams(searchParamsString);

      Object.entries(newFilter).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const newParamsString = params.toString();

      if (newParamsString !== searchParamsString) {
        setIsFilteringLoading(true); // 필터링 시작
        router.push(`${pathname}?${newParamsString}`);
      }
    },
    [searchParamsString, router, pathname],
  );

  // URL이 변경되면 필터링 완료 처리
  useEffect(() => {
    setIsFilteringLoading(false);
  }, [searchParamsString]);

  return { filters, handleFilterChange, isFilteringLoading };
};
