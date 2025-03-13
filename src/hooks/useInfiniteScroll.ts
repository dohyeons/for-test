import { useRef, useEffect, useCallback } from "react";

type UseInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage, isFetchingNextPage }: UseInfiniteScrollProps) => {
  // 무한 스크롤을 감지할 ref
  const ref = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver 인스턴스를 저장할 ref
  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); // 다음 데이터 요청
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  // 콜백 ref를 사용해 DOM 요소가 할당될 때 observer를 설정
  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerInstanceRef.current && ref.current) {
        observerInstanceRef.current.unobserve(ref.current);
      }
      ref.current = node;

      if (node && window.IntersectionObserver) {
        const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
        observer.observe(node);
        observerInstanceRef.current = observer;
      }
    },
    [handleObserver],
  );

  useEffect(() => {
    // 컴포넌트 언마운트 시 observer 정리
    return () => {
      if (observerInstanceRef.current && ref.current) {
        observerInstanceRef.current.unobserve(ref.current);
      }
    };
  }, []);

  return { observerRef, isFetchingNextPage };
};
