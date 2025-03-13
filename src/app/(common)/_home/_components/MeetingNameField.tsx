"use client";

import Input from "@/components/Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormDataType } from "@/app/(common)/_home/_hooks/useCreateGathering";

type MeetingNameFieldProps = {
  register: UseFormRegister<FormDataType>;
  errors: FieldErrors<FormDataType>;
};

export default function MeetingNameField({ register, errors }: MeetingNameFieldProps) {
  return (
    <div className="my-3">
      <label className="mb-3 text-base font-semibold">모임 이름</label>
      <Input
        placeholder="모임 이름을 입력하세요."
        register={register("name", {
          required: "모임 이름을 입력해주세요.",
          maxLength: { value: 20, message: "모임 이름은 최대 20자까지 가능합니다." },
        })}
      />
      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
    </div>
  );
}
