import { GatheringType } from "@/types";

export type MyGathering = GatheringType & {
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};
