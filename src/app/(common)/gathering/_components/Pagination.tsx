import { useMemo } from "react";
import Arrow from "@/images/arrow.svg";
import { cn } from "@/utils/classnames";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
  pageLimit?: number;
};

export default function Pagination({ currentPage, totalPages, onClick, pageLimit = 6 }: PaginationProps) {
  const currentStartPage = useMemo(() => {
    return Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
  }, [currentPage, pageLimit]);

  // 현재 페이지 그룹에서 보여줄 페이지 목록 생성
  const pages = useMemo(() => {
    return Array.from(
      { length: Math.min(pageLimit, totalPages - currentStartPage + 1) },
      (_, i) => currentStartPage + i,
    );
  }, [currentStartPage, pageLimit, totalPages]);

  return (
    <div className="mt-6 flex items-center justify-center gap-2 text-gray-200">
      <button
        onClick={() => onClick(currentStartPage - pageLimit)}
        disabled={currentPage <= pageLimit}
        aria-label="이전 페이지 그룹으로 이동"
      >
        <Arrow className={cn(currentPage > pageLimit && "text-black")} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onClick(page)}
          aria-label={`${page}페이지로 이동`}
          aria-current={currentPage === page && "page"}
          className={cn("size-12 text-gray-500", currentPage === page && "font-semibold text-black")}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onClick(currentStartPage + pageLimit)}
        disabled={currentStartPage + pageLimit > totalPages}
        aria-label="다음 페이지 그룹으로 이동"
      >
        <Arrow className={cn("scale-x-[-1] transform", currentStartPage + pageLimit <= totalPages && "text-black")} />
      </button>
    </div>
  );
}
