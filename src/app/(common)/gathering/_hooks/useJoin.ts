import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

const joinGathering = async (gatheringId: string) => {
  try {
    const { data } = await axiosInstance.post(`/gatherings/${gatheringId}/join`);
    return data;
  } catch (e) {
    const error = e as AxiosError<{ code: string; message: string }>;
    throw new Error(error.response?.data.message);
  }
};

export const useJoin = (gatheringId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gatheringId: string) => joinGathering(gatheringId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["participants", gatheringId],
      }),
  });
};
