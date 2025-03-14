import Image from "next/image";
import Profile from "@/images/profile.svg";
import CapacityStatus from "@/components/CapacityStatus";
import { cn } from "@/utils/classnames";
import Check from "@/images/check.svg";
import { PropsWithChildren } from "react";
import InactiveLayer from "@/components/InactiveLayer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type ListItemProps = {
  CardImage?: React.ReactNode;
  canceledAt?: string | null;
  handleCancel?: () => void;
  isCompleted?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

// ListItem의 템플릿 컴포넌트
export default function ListItem({
  children,
  CardImage,
  canceledAt,
  handleCancel,
  isCompleted,
  className,
}: PropsWithChildren<ListItemProps>) {
  return (
    <div
      className={`relative ${canceledAt && handleCancel && "overflow-hidden rounded-xl md:rounded-3xl"} flex w-full flex-col items-stretch gap-4 border-gray-300 md:max-w-none md:flex-row`}
    >
      {canceledAt && handleCancel && (
        <InactiveLayer isCompleted={isCompleted} onClick={handleCancel} message="모집 취소된 모임이에요" />
      )}
      {CardImage}
      <div className={`flex flex-col ${className}`}>{children}</div>
    </div>
  );
}

// 모임의 예약 상태를 나타내는 chip
type StatusChipProps = {
  styleType: "upcoming" | "completed" | "confirmed" | "waiting";
  children: React.ReactNode;
};
ListItem.StatusChip = ({ styleType, children }: StatusChipProps) => {
  const baseStyles = "break-keep rounded-3xl px-3 py-[6px] text-sm";

  const variantStyles = {
    upcoming: "bg-blue-1 text-blue-6",
    completed: "bg-gray-200 text-gray-500",
    confirmed: "flex items-center gap-1 border border-blue-2 bg-white text-blue-6",
    waiting: "border border-gray-200 bg-white text-gray-500",
  };
  return (
    <li className={cn(baseStyles, variantStyles[styleType])}>
      {styleType === "confirmed" && <Check className="text-blue-5" />}
      {children}
    </li>
  );
};

// chip의 컨테이너
type StatusProps = {
  isCompleted: boolean;
  participantCount: number;
};
ListItem.Status = ({ isCompleted, participantCount }: StatusProps) => {
  return (
    <ul className="flex gap-2">
      {isCompleted ? (
        <ListItem.StatusChip styleType="completed">이용 완료</ListItem.StatusChip>
      ) : (
        <>
          <ListItem.StatusChip styleType="upcoming">이용 예정</ListItem.StatusChip>
          <ListItem.StatusChip styleType={participantCount >= 5 ? "confirmed" : "waiting"}>
            {participantCount >= 5 ? "개설확정" : "개설대기"}
          </ListItem.StatusChip>
        </>
      )}
    </ul>
  );
};

// 참가한 모임 종류 및 장소
type TitleProps = {
  subtitle: string;
  title: string;
};
ListItem.Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div className="flex w-full items-center gap-2 md:max-w-max">
      <span className="text-lg font-semibold text-gray-900">{title}</span>
      <span className="text-lg font-semibold text-gray-900">|</span>
      <span className="text-sm text-gray-700">{subtitle}</span>
    </div>
  );
};

// 모임 데이터의 부가 정보(시간, 인원수)
type SubInfoProps = {
  date: string;
  participantCount: number;
  capacity: number;
};
ListItem.SubInfo = ({ date, participantCount, capacity }: SubInfoProps) => {
  const formatDate = dayjs(date).tz("Asia/Seoul").format("M월 D일");
  const formatTime = dayjs(date).tz("Asia/Seoul").format("HH:mm");
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      <div>{`${formatDate} · ${formatTime}`}</div>
      <CapacityStatus>
        {participantCount}/{capacity}
      </CapacityStatus>
    </div>
  );
};

// 리뷰 내용
ListItem.Body = ({ children }: { children: React.ReactNode }) => {
  return <p className="w-full break-words text-sm text-gray-700">{children}</p>;
};

// 리뷰할 모임에 대한 정보(종류, 장소)
ListItem.ServiceInfo = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-xs text-gray-700">{children}</span>;
};

// 리뷰 작성자의 정보
type MetaInfoProps = {
  imageUrl?: string | null;
  primary?: string;
  secondary: string;
};
ListItem.MetaInfo = ({ imageUrl, primary, secondary }: MetaInfoProps) => {
  return (
    <div className="flex items-center text-xs text-gray-500">
      {primary && (
        <div className="flex items-center gap-2">
          {imageUrl ? (
            <Image alt="사용자 이미지" src={imageUrl} width="24" height="24" className="size-6 rounded-full" />
          ) : (
            <Profile width="24" height="24" />
          )}
          <span className="text-xs text-gray-700">{primary}</span>
          <span className="mr-3 text-xs text-gray-700">|</span>
        </div>
      )}
      <span className="text-xs text-gray-500">{dayjs(secondary).utc().format("YYYY.MM.DD")}</span>
    </div>
  );
};
