import { useState, useEffect } from "react";

const TAB_ITEMS = ["나의 모임", "나의 리뷰", "내가 만든 모임"];
const CATEGORIES = ["작성 가능한 리뷰", "작성한 리뷰"];

export default function useMypageTab() {
  const [selectedTab, setSelectedTab] = useState(TAB_ITEMS[0]);
  // '나의 리뷰' 탭일 때만 카테고리를 보여줌
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    // '나의 리뷰'가 아닌 탭으로 이동할 경우 카테고리를 기본값으로 초기화
    if (selectedTab !== "나의 리뷰") {
      setSelectedCategory(CATEGORIES[0]);
    }
  }, [selectedTab]);
  return { selectedTab, setSelectedTab, selectedCategory, setSelectedCategory };
}
