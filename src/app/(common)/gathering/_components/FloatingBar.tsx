"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { LoginPopup, Popup } from "@/components/Popup";
import { useUserStore } from "@/stores/useUserStore";
import { copyClipboard } from "@/utils/copyClipboard";
import { useJoin } from "../_hooks/useJoin";
import { useGetParticipants } from "../_hooks/useGetParticipants";
import { useLeaveGathering } from "@/hooks/useLeaveGathering";
import { useCancelGathering } from "../_hooks/useCancelGathering";
import type { GatheringType } from "@/types";
import dayjs from "dayjs";

type FloatingBarProps = {
  gatheringId: string;
  gathering: GatheringType;
  hostUserId: number;
};

const MODAL = {
  join: "join",
  cancel: "cancel",
  share: "share",
  overcapacity: "overcapacity",
};

export default function FloatingBar({ gatheringId, gathering, hostUserId }: FloatingBarProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const { registrationEnd } = gathering;

  const { user } = useUserStore();

  const { data: participantList } = useGetParticipants(gatheringId);
  const { mutate: mutateJoin, isPending: isPendingJoin, error: joinError } = useJoin(gatheringId);
  const { mutate: mutateLeaveGathering, isPending: isPendingLeave } = useLeaveGathering(["participants", gatheringId]);
  const { mutate: mutateCancelGathering, isPending: isPendingCancel } = useCancelGathering();

  const participantIdList = participantList?.map((participant) => participant.userId);

  const isHost = user?.id === hostUserId;
  const isJoined = user ? participantIdList?.includes(user?.id) : false;
  const isValid = dayjs().isBefore(dayjs(registrationEnd));

  const closeModal = () => setActiveModal(null);

  const handleJoin = () => {
    if (!user) {
      setActiveModal(MODAL.join);
    } else {
      // 참여하기 api 요청
      mutateJoin(gatheringId, {
        onError: () => setActiveModal(MODAL.overcapacity),
      });
    }
  };

  const handleShare = () => {
    copyClipboard();
    closeModal();
  };

  if (isHost)
    return (
      <>
        <Container>
          <div>
            <div className="mb-1 text-sm font-semibold lg:text-base">더 건강한 나와 팀을 위한 프로그램 🏃‍️️</div>
            <div className="text-xs">국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요</div>
          </div>
          <div className="flex gap-2">
            <Button
              styleType="outline"
              size="sm"
              className={buttonStyles}
              onClick={() => setActiveModal(MODAL.cancel)}
              disabled={!isValid}
              loading={isPendingCancel}
            >
              취소하기
            </Button>
            <Button styleType="solid" size="sm" className={buttonStyles} onClick={() => setActiveModal(MODAL.share)}>
              공유하기
            </Button>
          </div>
        </Container>
        {activeModal === MODAL.cancel && (
          <Popup
            type={"confirm"}
            isOpen={!!activeModal}
            onClose={closeModal}
            onClick={() => mutateCancelGathering(gatheringId)}
          >
            <div>모임을 취소하시겠습니까?</div>
          </Popup>
        )}
        {activeModal === MODAL.share && (
          <Popup type={"alert"} isOpen={!!activeModal} onClose={closeModal} onClick={handleShare}>
            <div>현재 URL이 복사되었습니다.</div>
          </Popup>
        )}
      </>
    );

  return (
    <>
      <Container>
        <div>
          <div className="mb-1 text-sm font-semibold lg:text-base">더 건강한 나와 팀을 위한 프로그램 🏃‍️️</div>
          <div className="text-xs">
            <span className="mb-1 whitespace-nowrap">국내 최고 웰니스 전문가와 프로그램을</span>{" "}
            <span className="whitespace-nowrap">통해 지친 몸과 마음을 회복해봐요</span>
          </div>
        </div>
        <div className="flex gap-2">
          {user && isJoined ? (
            <Button
              styleType="outline"
              size="sm"
              className={buttonStyles}
              onClick={() => mutateLeaveGathering(gatheringId)}
              loading={isPendingLeave}
              disabled={!isValid}
            >
              참여 취소하기
            </Button>
          ) : (
            <Button
              styleType="solid"
              size="sm"
              className={buttonStyles}
              onClick={handleJoin}
              loading={isPendingJoin}
              disabled={isPendingJoin || !isValid}
            >
              참여하기
            </Button>
          )}
        </div>
      </Container>
      {activeModal === MODAL.join && <LoginPopup isOpen={!user && !!activeModal} onClose={closeModal} />}
      {activeModal === MODAL.overcapacity && (
        <Popup type={"alert"} isOpen={!!activeModal} onClick={closeModal} onClose={closeModal}>
          {joinError?.message}
        </Popup>
      )}
    </>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-center border-t-2 border-black bg-white px-4 py-5 md:px-6 lg:px-[102px]">
      <div className="w-full max-w-[1200px]">
        <div className="flex w-full justify-between gap-3">{children}</div>
      </div>
    </div>
  );
}

const buttonStyles = "whitespace-nowrap px-[15px] w-[115px]";
