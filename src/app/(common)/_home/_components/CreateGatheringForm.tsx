"use client";

import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormDataType, useCreateGathering } from "@/app/(common)/_home/_hooks/useCreateGathering";
import MeetingNameField from "@/app/(common)/_home/_components/MeetingNameField";
import LocationSelectField from "@/app/(common)/_home/_components/LocationSelectField";
import ImageUploadFiled from "@/app/(common)/_home/_components/ImageUploadFiled";
import CategorySelectField from "@/app/(common)/_home/_components/CategorySelectField";
import MeetingDateTimeValidator from "@/app/(common)/_home/_components/MeetingDateTimeValidator";
import CapacityField from "@/app/(common)/_home/_components/CapacityField";
import dayjs from "dayjs";

type CreateGatheringFormProps = {
  onClose: () => void;
};

export default function CreateGatheringForm({ onClose }: CreateGatheringFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    mode: "onChange",
  });

  const router = useRouter();
  const { mutate: createGathering, isPending } = useCreateGathering();

  const onSubmit = async (data: FormDataType) => {
    const adjustedMeetingDate = dayjs(data.dateTime).subtract(9, "hour").format("YYYY-MM-DDTHH:mm:ss");
    const adjustedDeadlineDate = dayjs(data.registrationEnd).subtract(9, "hour").format("YYYY-MM-DDTHH:mm:ss");
    const requestData = new FormData();
    requestData.append("name", data.name);
    requestData.append("location", data.location);
    requestData.append("type", data.type);
    requestData.append("dateTime", adjustedMeetingDate);
    requestData.append("registrationEnd", adjustedDeadlineDate);
    requestData.append("capacity", String(data.capacity));

    if (data.image) {
      requestData.append("image", data.image);
    }

    createGathering(requestData, {
      onSuccess: (response) => {
        onClose();
        router.push(`/gathering/${response.id}`);
      },
      onError: () => {
        setError("root", { type: "server", message: "서버 오류 발생. 다시 시도해주세요." });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MeetingNameField register={register} errors={errors} />
      <LocationSelectField register={register} setValue={setValue} watch={watch} errors={errors} />
      <ImageUploadFiled setValue={setValue} />
      <CategorySelectField setValue={setValue} watch={watch} />
      <MeetingDateTimeValidator setValue={setValue} watch={watch} />
      <CapacityField register={register} errors={errors} />

      {errors.root && <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>}

      <Button styleType="solid" size="lg" className="mt-7 w-full" disabled={!isValid || isPending} type="submit">
        {isPending ? "저장 중..." : "확인"}
      </Button>
    </form>
  );
}
