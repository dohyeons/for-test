"use client";

import LikeButton from "@/components/LikeButton";
import ChipInfo from "@/components/ChipInfo";
import ProgressBar from "@/components/ProgressBar";
import ConfirmedStamp from "@/components/ConfirmedStamp";
import DashedLine from "@/components/DashedLine";
import GatheredProfiles from "./GatheredProfiles";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useGetParticipants } from "@/app/(common)/gathering/_hooks/useGetParticipants";
import type { GatheringType } from "@/types";
import type { GatheringParticipantType } from "../types";

export type GatheringProps = {
  gatheringId: string;
  gathering: GatheringType;
  profileImages?: (string | null)[];
};

export default function GatheringInfo({ gatheringId, gathering }: GatheringProps) {
  const MIN_COUNT = 5;

  const { data: participants } = useGetParticipants(gatheringId);
  const profileImages = participants?.map((item: GatheringParticipantType) => item.User.image) || [];

  const { name, dateTime, location, participantCount, capacity } = gathering;

  const { favorites, toggleFavorite, isLoaded } = useFavoritesStore();
  const isLiked = favorites.includes(gatheringId);

  return (
    <div className="w-full rounded-3xl border-2 border-gray-200 bg-white md:h-60 lg:h-[270px]">
      <div className="mx-6 flex justify-between py-6 lg:pb-11">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="mb-3">{location}</div>
          <ChipInfo dateTime={dateTime} />
        </div>
        {isLoaded && <LikeButton isLiked={isLiked} onClick={() => toggleFavorite(gatheringId)} isClosed={false} />}
      </div>

      <DashedLine />

      <div className="mx-6 my-3 lg:m-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-[29px] items-center gap-4">
            <div className="text-sm font-semibold text-gray-900">모집정원 {profileImages.length}명</div>
            <GatheredProfiles profileImages={profileImages} />
          </div>
          {MIN_COUNT <= participantCount && <ConfirmedStamp />}
        </div>

        <ProgressBar progress={(profileImages?.length / capacity) * 100} />
        <div className="mt-2 flex justify-between text-xs font-medium text-gray-700">
          <div>최소인원 {MIN_COUNT}명</div>
          <div>최대인원 {capacity}명</div>
        </div>
      </div>
    </div>
  );
}
