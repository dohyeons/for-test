import Check from "@/images/check.svg";

export default function ConfirmedStamp() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-11">
        <Check alt={"확정 아이콘"} className="text-white" />
      </div>
      <div className="whitespace-nowrap text-sm font-medium text-blue-11">개설확정</div>
    </div>
  );
}
