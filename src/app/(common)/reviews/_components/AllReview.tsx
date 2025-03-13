"use client";

import ListItem from "@/components/ListItem";
import DashedLine from "@/components/DashedLine";
import Score from "@/components/Score";
import SortButton from "@/components/SortButton";
import LocationSelect from "@/components/Filtering/LocationSelect";
import DateSelect from "@/components/Filtering/DateSelect";
import { useAllReview } from "../_hooks/useAllReview";
import { useEffect } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";
import ServiceTab from "@/components/ServiceTab";
import { format } from "date-fns";
import { GATHERING_TYPE } from "@/utils/constants";
import type { ReviewQuery } from "@/types";

const SORT_OPTION = [
  { label: "최신순", value: "latest" },
  { label: "별점 높은순", value: "highScore" },
  { label: "참여 인원순", value: "highParticipants" },
];

type AllReviewProps = {
  children: React.ReactNode;
  defaultQuery: ReviewQuery;
};

export default function AllReview({ children, defaultQuery }: AllReviewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const paramsObj = useQueryParams();
  const query = Object.keys(paramsObj).length ? paramsObj : defaultQuery;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useAllReview(query);

  const { observerRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const handleTypeChange = (type: string | undefined) => {
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelect = (selected: string) => {
    const sort = selected;

    if (sort === "latest") {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "desc");
    } else if (sort === "highScore") {
      params.set("sortBy", "score");
      params.set("sortOrder", "desc");
    } else if (sort === "highParticipants") {
      params.set("sortBy", "participantCount");
      params.set("sortOrder", "desc");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const dateFormat = format(date, "yyyy-MM-dd");
      params.set("date", dateFormat);
    } else {
      params.delete("date");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLocationSelect = (location: string | undefined) => {
    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    Object.entries(defaultQuery).forEach(([key, value]) => {
      if (!params.has(key)) params.set(key, value.toString());
    });

    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  return (
    <div className="mt-6">
      <ServiceTab onCategoryChange={handleTypeChange} searchParams={searchParams} />
      <hr className="border-1 mb-6 mt-4" />
      {children}
      <div className="mt-6 border-t-2 border-black bg-white p-6">
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LocationSelect
                selectedLocation={searchParams.get("location") || ""}
                setSelectedLocation={handleLocationSelect}
                className="w-full"
              />
              <DateSelect onDateChange={handleDateSelect} />
            </div>
            <SortButton setSortType={handleSelect} sortOption={SORT_OPTION} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            {data?.reviews?.length > 0 ? (
              data.reviews.map((item, idx) => (
                <div key={item.id}>
                  <ListItem
                    CardImage={
                      <Image
                        src={item.gathering.image}
                        alt="모임 이미지"
                        width={280}
                        height={156}
                        className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
                      />
                    }
                  >
                    <div className="mb-2 flex flex-col gap-3">
                      <Score score={item.score} />
                      <ListItem.Body>{item.comment}</ListItem.Body>
                      <ListItem.ServiceInfo>
                        {GATHERING_TYPE[item.gathering.type]} 이용 · {item.gathering.location}
                      </ListItem.ServiceInfo>
                    </div>

                    <ListItem.MetaInfo
                      imageUrl={item.user.image ?? "/images/default_image.png"}
                      primary={item.user.name}
                      secondary={item.gathering.dateTime}
                    />
                  </ListItem>
                  <DashedLine className="mt-4" />
                  {idx === data.reviews.length - 1 ? <div ref={observerRef} /> : null}
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500">리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
