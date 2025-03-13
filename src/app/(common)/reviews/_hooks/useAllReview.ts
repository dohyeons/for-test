import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosInstance";
import type { ReviewQuery, ReviewResponse, ReviewsResponse } from "@/types";

export const getReviews = async (pageParam: number, query?: ReviewQuery): Promise<ReviewsResponse> => {
  const reviewQuery = { ...query, offset: (pageParam - 1) * 10 };
  try {
    const { data } = await axiosInstance.get("/reviews", { params: reviewQuery });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const useAllReview = (query?: ReviewQuery) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["reviews", query],
    queryFn: async ({ pageParam }) => getReviews(pageParam, query),
    select: (data) => ({
      reviews: data.pages.flatMap((page) =>
        page.data.map((review: ReviewResponse) => ({
          id: review.id,
          score: review.score,
          comment: review.comment,
          createdAt: review.createdAt,
          gathering: {
            id: review.Gathering.id,
            title: review.Gathering.title,
            image: review.Gathering.image,
            type: review.Gathering.type,
            location: review.Gathering.location,
            dateTime: review.Gathering.dateTime,
          },
          user: {
            id: review.User.id,
            name: review.User.name,
            image: review.User.image,
          },
        })),
      ),
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 마지막 페이지면 undefined 반환
    },
  });
};
