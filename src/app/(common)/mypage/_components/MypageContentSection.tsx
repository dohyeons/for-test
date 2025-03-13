import MyCreatedGatherings from "@/app/(common)/mypage/_components/MyCreatedGatherings";
import MyGatherings from "@/app/(common)/mypage/_components/MyGatherings";
import MyReviews from "@/app/(common)/mypage/_components/MyReviews";
import ReviewableGatherings from "@/app/(common)/mypage/_components/ReviewableGatherings";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Spinner } from "flowbite-react";
import { Suspense } from "react";

type MypageContentSectionProps = {
  selectedTab: string;
  selectedCategory: string;
};

export default function MypageContentSection({ selectedTab, selectedCategory }: MypageContentSectionProps) {
  return (
    <section
      className={`flex flex-1 flex-col ${selectedCategory !== "작성한 리뷰" ? "divide-y-2 divide-dashed" : "gap-6"}`}
    >
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <Spinner />
            </div>
          }
        >
          {selectedTab === "나의 모임" && <MyGatherings />}
          {selectedTab === "나의 리뷰" && selectedCategory === "작성 가능한 리뷰" && <ReviewableGatherings />}
          {selectedTab === "나의 리뷰" && selectedCategory === "작성한 리뷰" && <MyReviews />}
          {selectedTab === "내가 만든 모임" && <MyCreatedGatherings />}
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
