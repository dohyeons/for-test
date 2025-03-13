import CategoryButton from "@/components/CategoryButton";
import Tab from "@/components/Tab";

const TAB_ITEMS = ["나의 모임", "나의 리뷰", "내가 만든 모임"];
const CATEGORIES = ["작성 가능한 리뷰", "작성한 리뷰"];

type MypageTabProps = {
  setSelectedTab: (tab: string) => void;
  setSelectedCategory: (category: string) => void;
};
export default function MypageTab({ setSelectedTab, setSelectedCategory }: MypageTabProps) {
  return (
    <Tab
      category={
        <CategoryButton categories={CATEGORIES} setValue={setSelectedCategory}>
          {CATEGORIES.map((category) => (
            <CategoryButton.Title key={category} category={category} />
          ))}
        </CategoryButton>
      }
      targetIndex={1}
    >
      {TAB_ITEMS.map((tabItem, idx) => (
        <Tab.Item key={tabItem} index={idx}>
          <button
            onClick={() => {
              setSelectedTab(tabItem);
            }}
          >
            {tabItem}
          </button>
        </Tab.Item>
      ))}
    </Tab>
  );
}
