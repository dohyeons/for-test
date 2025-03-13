import Edit from "@/images/edit.svg";

type ProfileHeaderProps = {
  onEditClick: () => void;
};
// 제목 및 편집 버튼
export default function ProfileHeader({ onEditClick }: ProfileHeaderProps) {
  return (
    <div className="flex h-[64px] w-full items-start justify-between bg-blue-4 px-6 pt-4">
      <span className="text-lg font-semibold">내 프로필</span>
      <button onClick={onEditClick}>
        <Edit width="32" height="32" className="text-gray-200" />
      </button>
    </div>
  );
}
