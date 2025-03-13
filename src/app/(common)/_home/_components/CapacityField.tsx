"use client";

import Input from "@/components/Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormDataType } from "@/app/(common)/_home/_hooks/useCreateGathering";

type CapacityFieldProps = {
  register: UseFormRegister<FormDataType>;
  errors: FieldErrors<FormDataType>;
};

export default function CapacityField({ register, errors }: CapacityFieldProps) {
  return (
    <div className="my-3">
      <label className="mb-3 text-base font-semibold">모임 정원</label>
      <Input
        type="number"
        placeholder="최소 5인 이상 입력해주세요."
        register={register("capacity", {
          required: "모임 정원을 입력해주세요.",
          min: { value: 5, message: "모임 정원은 최소 5명 이상이어야 합니다." },
          max: { value: 30, message: "모임 정원은 최대 30명까지만 가능합니다." },
          pattern: { value: /^[0-9]+$/, message: "숫자만 입력해주세요." },
        })}
      />
      {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity.message}</p>}
    </div>
  );
}
