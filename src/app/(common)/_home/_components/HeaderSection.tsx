import GatheringLogo from "@/images/gathering_logo.svg";

const HeaderSection = () => (
  <div className="mb-5 flex flex-row items-center gap-4 pl-3 pt-10">
    <GatheringLogo />
    <div>
      <div className="mb-2 text-sm font-semibold text-gray-700">함께할 사람이 없나요?</div>
      <div className="text-lg font-semibold text-gray-900 lg:text-2xl">지금 모임에 참여해보세요</div>
    </div>
  </div>
);

export default HeaderSection;
