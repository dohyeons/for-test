"use client";

import CreateGatheringsModal from "@/app/(common)/_home/_components/CreateGatheringsModal";
import GatheringFilters from "@/app/(common)/_home/_components/GatheringFilters";
import Button from "@/components/Button";
import { LoginPopup } from "@/components/Popup";
import ServiceTab from "@/components/ServiceTab";
import HeaderSection from "./_components/HeaderSection";
import GatheringList from "./_components/GatheringList";
import { useFilters } from "@/app/(common)/_home/_hooks/useFilters";
import { useAuth } from "@/app/(common)/_home/_hooks/useAuth";
import { useState, useEffect } from "react";

export default function CardList() {
  const { filters, handleFilterChange, isFilteringLoading } = useFilters(); // 필터 관리 적용
  const { checkAuth, isAuthModalOpen, setAuthModalOpen, shouldOpenCreateModal, setShouldOpenCreateModal } = useAuth(); // 로그인 체크 적용

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (shouldOpenCreateModal) {
      setIsModalOpen(true);
      setShouldOpenCreateModal(false); // 로그인 후 다시 열리지 않도록 초기화
    }
  }, [shouldOpenCreateModal, setShouldOpenCreateModal]);

  const handleOpen = () => {
    checkAuth(() => {
      setIsModalOpen(true);
      setShouldOpenCreateModal(false);
    });
  };
  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <HeaderSection />
      <div className="relative mt-6">
        <div className="flex flex-row">
          <ServiceTab
            searchParams={new URLSearchParams(filters.toString())}
            onCategoryChange={(type) => {
              handleFilterChange({ type });
            }}
            isFilteringLoading={isFilteringLoading}
          />

          <LoginPopup
            isOpen={isAuthModalOpen}
            onClose={() => {
              setAuthModalOpen(false);
            }}
          />
        </div>
        <Button
          type="button"
          styleType="solid"
          size="sm"
          className="absolute right-0 top-0 h-10 w-24 md:h-11"
          onClick={handleOpen}
        >
          모임 만들기
        </Button>
      </div>
      <hr className="my-3" />
      <div>
        <GatheringFilters onChange={handleFilterChange} />
        <GatheringList filters={filters} />
      </div>
      <CreateGatheringsModal isOpen={isModalOpen} onClose={handleClose} />
    </div>
  );
}
