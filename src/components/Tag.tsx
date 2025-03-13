import Alarm from "@/images/alarm.svg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
type TagProps = {
  registrationEnd: string; // 모집 마감 날짜를 받음
};

export default function Tag({ registrationEnd }: TagProps) {
  const now = dayjs();
  const endDate = dayjs(registrationEnd).tz("Asia/Seoul");

  let displayText = "";

  // 마감일이 오늘인지 확인
  if (now.isSame(endDate, "day")) {
    if (endDate.isBefore(now)) {
      displayText = "모집 마감";
    } else {
      displayText = `오늘 ${endDate.format("HH시 mm분")} 마감`;
    }
  } else if (endDate.isBefore(now, "day")) {
    // 마감일이 현재보다 이전 날짜라면 "모집 마감" 출력
    displayText = "모집 마감";
  } else {
    // 날짜가 남았다면 "N일 후 마감"으로 표시
    const daysLeft = Math.ceil(endDate.diff(now, "hour") / 24);
    displayText = `${daysLeft}일 후 마감`;
  }

  return (
    <div className="absolute right-0 top-0 flex h-8 items-center justify-center rounded-bl-lg rounded-tr-3xl bg-primary-color py-1 pl-2 pr-4 text-sm font-medium text-white md:rounded-tr-none lg:rounded-tr-none">
      <Alarm className="mt-0.5" />
      <span className="ml-1">{displayText}</span>
    </div>
  );
}
