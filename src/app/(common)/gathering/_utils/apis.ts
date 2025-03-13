import axiosInstance from "@/lib/axiosInstance";

import type { ReviewQuery, ReviewsResponse } from "@/types";
import type { GatheringParticipantType } from "../types";

export const fetchReviews = async (query?: ReviewQuery): Promise<ReviewsResponse> => {
  try {
    const { data } = await axiosInstance.get("/reviews", { params: query });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export const getParticipants = async (gatheringId: string): Promise<GatheringParticipantType[]> => {
  const { data } = await axiosInstance.get(`/gatherings/${gatheringId}/participants?limit=100`);
  return data;
};
