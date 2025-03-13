"use client";

import Avatar from "@/components/Avatar";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";

// 프로필 이미지, 이름, 회사, 이메일 등 사용자 정보를 표시
export default function ProfileInfo() {
  const { data } = useGetUserInfo();
  return (
    <div className="flex w-full flex-col gap-2 pl-24 pt-3">
      {data ? (
        <>
          <div className="absolute left-6 top-[54px]">
            <Avatar size={"lg"} imageUrl={data.image} />
          </div>
          <span className="font-semibold text-gray-800">{data.name}</span>
          <div className="flex flex-col gap-1">
            <div className="text-sm">
              <span className="font-medium text-gray-800">company. </span>
              <span className="text-gray-700">{data.companyName}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-800">E-mail. </span>
              <span className="text-gray-700">{data.email}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex animate-pulse flex-col gap-2">
            <div className="absolute left-6 top-[54px] size-14 rounded-full bg-gray-200"></div>
            <div className="h-5 w-[50px] rounded-md bg-gray-200"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-[150px] rounded-md bg-gray-200 text-sm">
                <span className="font-medium text-gray-800"></span>
                <span className="text-gray-700"></span>
              </div>
              <div className="h-4 w-[150px] rounded-md bg-gray-200 text-sm">
                <span className="font-medium text-gray-800"></span>
                <span className="text-gray-700"></span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
