"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Edit from "@/images/edit.svg";
import Avatar from "@/components/Avatar";
import { useProfileEditForm } from "@/app/(common)/mypage/_hooks/useProfileEditForm";
import { Popup } from "@/components/Popup";

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// 프로필을 수정하는 폼
export default function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  const {
    profileForm: {
      register,
      handleSubmit,
      formState: { errors },
    },
    isModalOpen,
    handleModalClose,
    onSubmit,
    mutation,
    previewUrl,
    isDisabled,
  } = useProfileEditForm(isOpen, onClose);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="mx-4 flex w-full max-w-[520px] flex-col gap-6 md:mx-0">
        <div className="text-lg font-semibold">프로필 수정하기</div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <label htmlFor="profile_img" className="relative w-fit hover:cursor-pointer">
            <Avatar size="lg" imageUrl={previewUrl} />
            <Edit width="18" height="18" className="absolute bottom-1 right-1 text-white" />
          </label>
          <input id="profile_img" type="file" hidden accept=".jpg,.jpeg,.png" {...register("profileImg")} />
          <div className="flex flex-col gap-3">
            <label htmlFor="company" className="font-semibold text-gray-800">
              회사
            </label>
            <Input
              placeholder="회사, 단체명"
              register={register("companyName", {
                required: "회사명을 입력해주세요.",
                maxLength: { value: 18, message: "회사명은 18자 이하로 입력해주세요." },
                validate: (value) => value.trim() === value || "앞뒤 공백을 지워주세요",
              })}
              helperText={errors.companyName?.message}
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={onClose} styleType="outline" className="w-full">
              취소
            </Button>
            <Button type="submit" disabled={isDisabled} className="w-full" loading={mutation.isPending}>
              수정하기
            </Button>
          </div>
        </form>
      </Modal>
      <Popup isOpen={isModalOpen} onClose={handleModalClose} onClick={handleModalClose} type="alert">
        에러: {mutation.error?.message}
      </Popup>
    </>
  );
}
