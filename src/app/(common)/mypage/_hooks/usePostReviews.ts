import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const postReviews = async (reviewData: { gatheringId: number; score: number; comment: string }) => {
  try {
    const { data } = await axiosInstance.post(`/reviews`, reviewData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const { response, request } = error;

      if (response) {
        // 서버에서 응답이 온 경우
        const { status, data } = response;

        if (status === 403) throw new Error("참석한 모임이 아닙니다.");
        if (status === 404 && data.message === "모임을 찾을 수 없습니다") {
          throw new Error("해당 모임을 찾을 수 없습니다");
        }

        throw new Error(data.message || "리뷰 작성 중 오류가 발생했습니다.");
      } else if (request) {
        // 요청이 이루어졌지만 응답을 받지 못한 경우
        throw new Error("서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.");
      }
    }

    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export default function usePostReviews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReviews,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return key[0] === "user" && (key[1] === "reviews" || key[1] === "gatherings");
        },
      });
    },
  });
}
