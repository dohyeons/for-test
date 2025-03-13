import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

// 모임 참여 취소
const leaveGathering = async (gatheringId: string | number) => {
  const { data } = await axiosInstance.delete(`/gatherings/${gatheringId}/leave`);
  return data;
};

export const useLeaveGathering = (queryKey: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gatheringId: string | number) => leaveGathering(gatheringId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
    onError: (error) => {
      console.error("모임 참여 취소 중 오류 발생:", error);
    },
  });
};
