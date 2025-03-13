import type { UserType, ReviewResponse } from "@/types";

export type GatheringParticipantType = {
  User: UserType;
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
};

export type Review = Omit<ReviewResponse, "User" | "Gathering"> & { user: UserType };
