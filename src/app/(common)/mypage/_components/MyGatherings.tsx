import ListItem from "@/components/ListItem";
import Image from "next/image";
import Button from "@/components/Button";
import { useLeaveGathering } from "@/hooks/useLeaveGathering";
import MypageList from "@/app/(common)/mypage/_components/MypageList";
import { fetchMyGatherings } from "@/app/(common)/mypage/utils/apis";
import DEFAULT_IMAGE from "@/images/default_image.png";
import { ReviewModal } from "@/app/(common)/mypage/_components/ReviewModal";
import Link from "next/link";
import CancelConfirmModal from "@/app/(common)/mypage/_components/CancelConfirmModal";
import useMypageModal from "@/app/(common)/mypage/_hooks/useMypageModal";

// 이용 예정 => 모임 참여 신청했고 isCompleted가 false인 경우
// 이용 완료 => 모임 참여 신청했고 isCompleted가 true인 경우
// 개설 대기 => participantCount가 5 미만인 경우
// 개설 확정 => participantCount가 5 이상인 경우

// 이용 예정 & 개설 대기 => 예약 취소 가능
// 이용 예정 & 개설 확정 => 예약 취소 가능
// 이용 완료 & isReviewed = true => 리뷰 작성하기
// 이용 완료 & isReviewed = false => ???

// 참여 시간이 지나지 않았고 아직 모집 중인 모임에 대해 예약을 취소할 수 있습니다.
// registrationEnd가 끝나지 않았고,
// 아직 모집 중인 모임??? => 취소되지 않은 모임.

// 리뷰
// isCompleted가 true, isReviewed가 false => 리뷰 작성하기
// isCompleted가 true, isReviewed가 true => 리뷰 작성 x

export default function MyGatherings() {
  // 리뷰 모달
  const { isModalOpen, selectedGathering, handleOpen, handleClose } = useMypageModal();

  // 취소 확인 모달
  const {
    isModalOpen: isCancelModalOpen,
    selectedGathering: cancelGathering,
    handleOpen: handleCancelGathering,
    handleClose: handleCancelGatheringClose,
  } = useMypageModal();

  const mutation = useLeaveGathering(["user", "gatherings"]);
  return (
    <>
      <MypageList
        queryOption={{ queryFn: () => fetchMyGatherings(), queryKey: ["user", "gatherings", "joined"] }}
        emptyMessage={"신청한 모임이 아직 없어요"}
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
                isCompleted={gathering.isCompleted}
                canceledAt={gathering.canceledAt}
                handleCancel={() => mutation.mutate(gathering.id)}
                className="justify-between"
              >
                <div className="flex flex-col gap-2.5">
                  <ListItem.Status isCompleted={gathering.isCompleted} participantCount={gathering.participantCount} />
                  <div className="flex flex-col gap-1">
                    <ListItem.Title title={gathering.name} subtitle={gathering.location} />
                    <ListItem.SubInfo
                      date={gathering.dateTime}
                      participantCount={gathering.participantCount}
                      capacity={gathering.capacity}
                    />
                  </div>
                </div>
                {gathering.isReviewed ? (
                  <Button className={"mt-[18px] w-full max-w-[120px]"} size={"sm"} styleType={"solid"} disabled>
                    리뷰 작성 완료
                  </Button>
                ) : (
                  <Button
                    onClick={
                      gathering.isCompleted
                        ? (e) => {
                            e.preventDefault();
                            handleOpen(gathering.id);
                          }
                        : (e) => {
                            e.preventDefault();
                            handleCancelGathering(gathering.id);
                          }
                    }
                    className={"mt-[18px] w-full max-w-[120px]"}
                    size={"sm"}
                    styleType={gathering.isCompleted ? "solid" : "outline"}
                    disabled={!!gathering.canceledAt}
                  >
                    {/*모임이 끝났으면 리뷰 작성 / 아니면 예약 취소 */}
                    {gathering.isCompleted ? "리뷰 작성하기" : "예약 취소하기"}
                  </Button>
                )}
              </ListItem>
            </Link>
          </div>
        )}
      />
      <ReviewModal isOpen={isModalOpen} onClose={handleClose} gatheringId={selectedGathering as number} />
      <CancelConfirmModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelGatheringClose}
        gatheringId={cancelGathering as number}
        handleModalClose={handleCancelGatheringClose}
      />
    </>
  );
}
