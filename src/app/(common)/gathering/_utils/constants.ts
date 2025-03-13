export const REVIEW_LIMIT = 4; // 한 페이지에 보여줄 리뷰 개수

export const SORT_OPTIONS = [
  { label: "최신순", value: "latest" }, // sortBy=createdAt&sortOrder=desc
  { label: "별점 높은순", value: "highScore" }, // sortBy=score&sortOrder=desc
  { label: "별점 낮은순", value: "lowScore" }, // sortBy=score&sortOrder=asc
] as const;

export const SORT_VALUE = {
  latest: "latest",
  highScore: "highScore",
  lowScore: "lowScore",
} as const;

export const QUERY_PARAMS = {
  gatheringId: "gatheringId",
  sortBy: "sortBy",
  sortOrder: "sortOrder",
  offset: "offset",
  limit: "limit",
} as const;

export const SORT_BY = {
  createdAt: "createdAt",
  score: "score",
  participantCount: "participantCount",
} as const;

export const SORT_ORDER = {
  desc: "desc",
  asc: "asc",
} as const;

export const DEFAULT_QUERY_VALUES = {
  [QUERY_PARAMS.limit]: REVIEW_LIMIT.toString(),
  [QUERY_PARAMS.offset]: "0",
  [QUERY_PARAMS.sortBy]: "createdAt",
  [QUERY_PARAMS.sortOrder]: "desc",
} as const;
