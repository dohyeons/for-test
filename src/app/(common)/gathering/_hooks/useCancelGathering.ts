import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

// 주최자가 모임 참여 취소
const cancelGathering = async (gatheringId: string) => {
  const { data } = await axiosInstance.put(`/gatherings/${gatheringId}/cancel`);
  return data;
};

export const useCancelGathering = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (gatheringId: string) => cancelGathering(gatheringId),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("모임 취소 중 오류 발생:", error);
    },
  });
};
