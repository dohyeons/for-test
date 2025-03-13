const GATHERING_TYPE = ["DALLAEMFIT", "OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"] as const;

export type ScoresQuery = {
  gatheringId?: number;
  type?: (typeof GATHERING_TYPE)[number];
};

export type ScoresResponse = {
  teamId: number;
  gatheringId: number;
  type?: (typeof GATHERING_TYPE)[number];
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};
