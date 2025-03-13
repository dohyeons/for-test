"use client";

import MypageContentSection from "@/app/(common)/mypage/_components/MypageContentSection";
import MypageTab from "@/app/(common)/mypage/_components/MypageTab";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";
import useMypageTab from "@/app/(common)/mypage/_hooks/useMypageTab";
import { MyGathering } from "@/app/(common)/mypage/types";
import axiosInstance from "@/lib/axiosInstance";
import { UserType, ReviewsResponse, GatheringType } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

// 나의 모임 -> 로그인된 사용자가 참석한 모임 목록 조회
// 나의 리뷰 - 작성 가능한 리뷰 -> 로그인된 사용자가 참석한 모임 목록 조회 (리뷰 작성 여부 false 필터링)
// 나의 리뷰 - 작성한 리뷰 -> 리뷰 목록 조회 (사용자 id로 필터링)
// 내가 만든 모임 -> 모임 목록 조회 (모임 생성자(id) 로 필터링)
export default function MypageContent() {
  const queryClient = useQueryClient();
  const { selectedTab, setSelectedTab, selectedCategory, setSelectedCategory } = useMypageTab();
  const { data } = useGetUserInfo("");
  const id = data?.id;
  useQuery({
    queryKey: ["user", "reviews", "reviewable"],
    queryFn: async () => {
      const response = await axiosInstance.get<MyGathering[]>("gatherings/joined", {
        params: {
          limit: 100,
          completed: true,
          reviewed: false,
        },
      });
      const data = response.data.filter((gathering) => !gathering.canceledAt);
      return data.sort((a, b) => dayjs(b.dateTime).valueOf() - dayjs(a.dateTime).valueOf());
    },
  });
  useQuery({
    queryKey: ["user", "reviews", "written"],
    queryFn: async () => {
      const user = queryClient.getQueryData<UserType>(["user"]);
      const response = await axiosInstance.get<ReviewsResponse>("reviews", {
        params: {
          limit: 100,
          userId: user?.id,
        },
      });

      return response.data.data.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    },
    enabled: Boolean(id),
  });
  useQuery({
    queryKey: ["user", "gatherings", "created"],
    queryFn: async () => {
      const user = queryClient.getQueryData<UserType>(["user"]);
      const response = await axiosInstance.get<GatheringType[]>(`gatherings`, {
        params: {
          limit: 100,
          sortBy: "dateTime",
          sortOrder: "desc",
          createdBy: user?.id,
        },
      });

      return response.data;
    },
    enabled: Boolean(id),
  });
  return (
    <div className="flex flex-1 flex-col gap-6 border-t-2 border-gray-900 bg-white p-6">
      <MypageTab setSelectedCategory={setSelectedCategory} setSelectedTab={setSelectedTab} />
      <MypageContentSection selectedTab={selectedTab} selectedCategory={selectedCategory} />
    </div>
  );
}
