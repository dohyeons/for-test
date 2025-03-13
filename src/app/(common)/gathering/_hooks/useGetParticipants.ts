import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "../_utils/apis";

export const useGetParticipants = (gatheringId: string) => {
  return useQuery({
    queryKey: ["participants", gatheringId],
    queryFn: () => getParticipants(gatheringId),
  });
};
