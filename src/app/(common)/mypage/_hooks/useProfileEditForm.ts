import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserInfo } from "@/app/(common)/mypage/_hooks/useUpdateUserInfo";
import { useGetUserInfo } from "@/app/(common)/mypage/_hooks/useGetUserInfo";

export type FormValues = {
  companyName: string;
  profileImg: FileList;
};

export function useProfileEditForm(isOpen: boolean, onClose: () => void) {
  const { data } = useGetUserInfo();
  const [previewUrl, setPreviewUrl] = useState(data?.image || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileForm = useForm<FormValues>({ mode: "onChange", defaultValues: { companyName: data?.companyName } });

  const mutation = useUpdateUserInfo();

  const watchedProfileImg = profileForm.watch("profileImg");

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // 이미지 미리보기 설정
  useEffect(() => {
    if (watchedProfileImg && watchedProfileImg.length > 0) {
      const file = watchedProfileImg[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(data?.image || "");
    }
  }, [watchedProfileImg, data?.image]);

  // 모달이 열릴 때 폼 초기화
  useEffect(() => {
    if (isOpen) {
      profileForm.reset({ companyName: data?.companyName, profileImg: undefined });
      setPreviewUrl(data?.image || "");
    }
  }, [isOpen]);

  // 폼 제출 로직
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("companyName", data.companyName);

    if (data.profileImg && data.profileImg.length > 0) {
      formData.append("image", data.profileImg[0]);
    }
    mutation.mutate(formData, {
      onSuccess: () => {
        onClose();
      },
      onError: () => {
        setIsModalOpen(true);
      },
    });
  };

  const isProfileUnchanged = (!watchedProfileImg || watchedProfileImg.length === 0) && previewUrl === data?.image;
  const isCompanyNameUnchanged = profileForm.watch("companyName") === data?.companyName;

  return {
    profileForm,
    onSubmit,
    previewUrl,
    isModalOpen,
    mutation,
    handleModalClose,
    isDisabled: !profileForm.formState.isValid || (isProfileUnchanged && isCompanyNameUnchanged),
  };
}
