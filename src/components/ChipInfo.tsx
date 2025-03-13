import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type ChipInfoProps = {
  dateTime: string;
};

export default function ChipInfo({ dateTime }: ChipInfoProps) {
  // 날짜 포맷: "MM-DD" 형식
  const formattedDate = dayjs(dateTime).tz("Asia/Seoul").format("M월 D일");
  // 시간 포맷: "HH:MM" 형식
  const formattedTime = dayjs(dateTime).tz("Asia/Seoul").format("HH:mm");

  return (
    <div className="flex gap-2">
      <div className="flex h-6 items-center justify-center rounded bg-gray-900 px-2">
        {/* 날짜 */}
        <div className="text-center text-sm font-medium text-white">{formattedDate}</div>
      </div>
      <div className="flex h-6 items-center justify-center rounded bg-gray-900 px-2">
        {/* 시간 */}
        <div className="text-center text-sm font-medium text-primary-color">{formattedTime}</div>
      </div>
    </div>
  );
}
