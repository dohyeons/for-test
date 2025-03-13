import MypageList from "@/app/(common)/mypage/_components/MypageList";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";
import { fetchMyCreatedGatherings } from "@/app/(common)/mypage/utils/apis";
import ListItem from "@/components/ListItem";
import Image from "next/image";
import DEFAULT_IMAGE from "@/images/default_image.png";
import Link from "next/link";
export default function MyCreatedGatherings() {
  const { data: userData } = useGetUserInfo();

  return (
    <>
      <MypageList
        queryOption={{
          queryKey: ["user", "gatherings", "created"],
          queryFn: () => fetchMyCreatedGatherings(userData?.id || 0),
        }}
        emptyMessage={"아직 만든 모임이 없어요"}
        render={(gathering) => (
          <div className="relative py-6" key={gathering.id}>
            <Link href={`/gathering/${gathering.id}`}>
              <ListItem
                CardImage={
                  <Image
                    src={gathering.image || DEFAULT_IMAGE}
                    alt={`${gathering.name} 이미지`}
                    width={280}
                    height={156}
                    className="h-[156px] w-full rounded-3xl md:max-w-[280px]"
                  />
                }
                className="justify-between"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1">
                    <ListItem.Title title={gathering.name} subtitle={gathering.location} />
                    <ListItem.SubInfo
                      date={gathering.dateTime}
                      participantCount={gathering.participantCount}
                      capacity={gathering.capacity}
                    />
                  </div>
                </div>
              </ListItem>
            </Link>
          </div>
        )}
      />
    </>
  );
}
