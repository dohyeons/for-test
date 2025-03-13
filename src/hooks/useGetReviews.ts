import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import type { ReviewQuery, ReviewsResponse } from "@/types";

export const getReviews = async (query?: ReviewQuery): Promise<ReviewsResponse> => {
  try {
    const { data } = await axiosInstance.get("/reviews", { params: query });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const useGetReviews = (gatheringId?: string, query?: ReviewQuery) => {
  const reviewQuery = { gatheringId, ...query };

  return useSuspenseQuery({
    queryKey: ["reviews", reviewQuery],
    queryFn: () => getReviews(reviewQuery),
    select: (data) => ({
      reviews: data.data.map((review) => ({
        id: review.id,
        score: review.score,
        comment: review.comment,
        createdAt: review.createdAt,
        user: {
          id: review.User.id,
          name: review.User.name,
          image: review.User.image,
        },
      })),
      totalItemCount: data.totalItemCount,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
    }),
  });
};
