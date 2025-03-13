"use client";

import { useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import CategoryButton from "@/components/CategoryButton";
import { FormDataType } from "@/app/(common)/_home/_hooks/useCreateGathering";

type CategorySelectFieldProps = {
  setValue: UseFormSetValue<FormDataType>;
  watch: UseFormWatch<FormDataType>;
};

export default function CategorySelectField({ setValue, watch }: CategorySelectFieldProps) {
  // 현재 선택된 값 확인
  const selectedType = watch("type");

  // 기본값 설정 (초기 렌더링 시 실행)
  useEffect(() => {
    if (!selectedType) {
      setValue("type", "OFFICE_STRETCHING", { shouldValidate: true });
    }
  }, [selectedType, setValue]);

  return (
    <div className="my-3">
      <label className="mb-3 text-base font-semibold">선택 서비스</label>
      <CategoryButton
        categories={["OFFICE_STRETCHING", "MINDFULNESS", "WORKATION"]}
        setValue={(value) => setValue("type", value)}
      >
        <CategoryButton.Checkbox category="달램핏" label="오피스 스트레칭" subText="OFFICE_STRETCHING" />
        <CategoryButton.Checkbox category="달램핏" label="마인드 풀니스" subText="MINDFULNESS" />
        <CategoryButton.Checkbox category="워케이션" label="워케이션" subText="WORKATION" />
      </CategoryButton>
    </div>
  );
}
