import axiosInstance from "@/lib/axiosInstance";
import type { ScoresQuery, ScoresResponse } from "../types";

export const fetchReviewsScores = async (query?: ScoresQuery): Promise<ScoresResponse[]> => {
  try {
    const { data } = await axiosInstance.get("/reviews/scores", { params: query });
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};
