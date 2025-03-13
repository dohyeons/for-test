"use client";

import ProfileEditModal from "@/app/(common)/mypage/_components/ProfileSection/ProfileEditModal";
import ProfileHeader from "@/app/(common)/mypage/_components/ProfileSection/ProfileHeader";
import ProfileInfo from "@/app/(common)/mypage/_components/ProfileSection/ProfileInfo";
import { useState } from "react";

export default function ProfileSection() {
  // 유저 정보를 가져오기
  const [isModal, setIsModal] = useState(false);
  const handleOpen = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };
  return (
    <section className="relative w-full overflow-hidden rounded-3xl border-2 border-gray-200 bg-white pb-5">
      <ProfileHeader onEditClick={handleOpen} />
      <ProfileEditModal isOpen={isModal} onClose={handleClose} />
      <ProfileInfo />
    </section>
  );
}
