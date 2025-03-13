"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type TabContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addTabRefs: (index: number, ref: HTMLLIElement | null) => void;
  sliderStyle: { width: number; translateX: number };
};

const TabContext = createContext<TabContextType | null>(null);

function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("Tab compound components must be used within a Tab.Root");
  }
  return context;
}

// Tab의 props
type TabProps = {
  children: React.ReactNode;
  category?: React.ReactNode; // 카태고리 버튼
  targetIndex?: number; // 클릭 시 카테고리가 나와야 할 index
  gap?: string; // 탭과 카테고리의 간격
};
// Tab 루트 컴포넌트
export default function Tab({ children, category, targetIndex, gap = "gap-4" }: TabProps) {
  // 현재 활성화된 탭의 인덱스
  const [activeIndex, setActiveIndex] = useState(0);
  // 슬라이더의 길이 및 X축 이동거리
  const [sliderStyle, setSliderStyle] = useState({ width: 0, translateX: 0 });
  // 탭들의 ref
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!tabRefs.current.length) return; // 아직 ref 배열이 비어 있다면 패스
    // 현재 활성화 된 Tab
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      const width = activeTab.offsetWidth;
      // 활성 탭 이전 탭들의 누적 offsetWidth를 계산. gap인 12px을 더해준다.
      const offsetLeft = tabRefs.current
        .slice(0, activeIndex)
        .reduce((acc, el) => acc + (el?.offsetWidth || 0) + 12, 0);
      setSliderStyle({ width, translateX: offsetLeft });
    }
  }, [activeIndex]);

  // context에 전달할 값들
  const contextValue = {
    activeIndex,
    setActiveIndex,
    addTabRefs: (index: number, ref: HTMLLIElement | null) => {
      tabRefs.current[index] = ref;
    },
    sliderStyle,
  };
  return (
    <TabContext.Provider value={contextValue}>
      <div className={`flex flex-col ${gap}`}>
        <div className="relative">
          {/* 탭 */}
          <ul className="flex gap-3 text-lg font-semibold text-gray-400">{children}</ul>
          {/* 슬라이더 */}
          <div
            style={{
              width: sliderStyle.width,
              transform: `translateX(${sliderStyle.translateX}px)`,
            }}
            className={`absolute bottom-0 h-[2px] bg-gray-900 transition-all duration-300`}
          />
        </div>
        {targetIndex === activeIndex && <div>{category}</div>}
      </div>
    </TabContext.Provider>
  );
}

// 탭 아이템
type ItemProps = {
  index: number;
  children: React.ReactNode;
};
Tab.Item = function ({ index, children }: ItemProps) {
  const { activeIndex, setActiveIndex, addTabRefs } = useTabContext();
  return (
    <li
      onClick={() => setActiveIndex(index)}
      ref={(el) => {
        addTabRefs(index, el);
      }}
      // 활성화된 탭이면 text의 색을 변경
      className={`${activeIndex === index && "text-gray-900"} mb-1 flex cursor-pointer items-center gap-1 transition-colors duration-300`}
    >
      {children}
    </li>
  );
};
