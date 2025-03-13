import { MyGathering } from "@/app/(common)/mypage/types";
import axiosInstance from "@/lib/axiosInstance";
import { CardData } from "@/stores/useGatheringStore";
import { GatheringType, ReviewsResponse } from "@/types";
import dayjs from "dayjs";

type FetchMyGatheringsParams = {
  completed?: boolean;
  reviewed?: boolean;
};

const fetchMyGatherings = async (query?: FetchMyGatheringsParams, isReviewable?: boolean) => {
  const response = await axiosInstance.get<MyGathering[]>("gatherings/joined", {
    params: {
      limit: 100,
      ...query,
    },
  });
  const data = isReviewable ? response.data.filter((gathering) => !gathering.canceledAt) : response.data;
  return data.sort((a, b) => dayjs(b.dateTime).valueOf() - dayjs(a.dateTime).valueOf());
};

const fetchMyReviews = async (userId: number) => {
  const response = await axiosInstance.get<ReviewsResponse>("reviews", {
    params: {
      limit: 100,
      userId,
    },
  });

  return response.data.data.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
};

const fetchMyCreatedGatherings = async (createdBy: number) => {
  const response = await axiosInstance.get<GatheringType[]>("gatherings", {
    params: {
      limit: 100,
      sortBy: "dateTime",
      sortOrder: "desc",
      createdBy,
    },
  });

  return response.data;
};

export { fetchMyGatherings, fetchMyReviews, fetchMyCreatedGatherings };
