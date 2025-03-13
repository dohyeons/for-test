import ReviewsAverage from "@/app/(common)/reviews/_components/ReviewsAverage";

import { Suspense } from "react";
import AllReview from "../reviews/_components/AllReview";
import GatheringLogo from "@/images/gathering_logo.svg";
import Spinner from "@/components/Spinner";
import type { ReviewQuery } from "@/types";

export default async function Page({ searchParams }: { searchParams: Promise<ReviewQuery> }) {
  const query = await searchParams;

  const type = query.type ?? "DALLAEMFIT";
  const sortBy = query.sortBy ?? "createdAt";
  const sortOrder = query.sortOrder ?? "desc";
  const reviewParams = { type, sortBy, sortOrder };

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-row items-center gap-4 pl-3 pt-10">
        <GatheringLogo />
        <div>
          <div className="mb-2 text-2xl font-semibold text-gray-900 lg:text-2xl">모든 리뷰</div>
          <div className="text-sm font-semibold text-gray-700">같이달램을 이용한 분들은 이렇게 느꼈어요 🫶</div>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <AllReview defaultQuery={reviewParams}>
          <ReviewsAverage />
        </AllReview>
      </Suspense>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex h-1/3 items-center justify-center">
      <Spinner />
    </div>
  );
}
