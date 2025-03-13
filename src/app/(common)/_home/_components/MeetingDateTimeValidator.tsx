"use client";

import { useState } from "react";
import MeetingDateTimeField from "./MeetingDateTimeField"; // UI 컴포넌트
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormDataType } from "../_hooks/useCreateGathering";
import dayjs from "dayjs";

type MeetingDateTimeValidatorProps = {
  setValue: UseFormSetValue<FormDataType>;
  watch: UseFormWatch<FormDataType>;
};

// 날짜 검증 로직
export default function MeetingDateTimeValidator({ setValue, watch }: MeetingDateTimeValidatorProps) {
  const [errorMessage, setErrorMessage] = useState("");

  const meetingDateTime = watch("dateTime") ? new Date(watch("dateTime")) : null;
  const deadlineDateTime = watch("registrationEnd") ? new Date(watch("registrationEnd")) : null;

  const handleMeetingDateChange = (date: Date | null) => {
    const now = new Date();
    if (date && date < now) {
      setErrorMessage("과거 날짜는 선택할 수 없습니다.");
      return;
    }
    setErrorMessage("");
    setValue("dateTime", dayjs(date).format("YYYY-MM-DDTHH:mm:ss"), { shouldValidate: true });
  };

  const handleDeadlineDateChange = (date: Date | null) => {
    const now = new Date();
    if (date && date < now) {
      setErrorMessage("과거 날짜는 선택할 수 없습니다.");
      return;
    }
    if (meetingDateTime && date && date > meetingDateTime) {
      setErrorMessage("모임 마감 날짜는 모임 날짜보다 늦을 수 없습니다.");
      return;
    }
    setErrorMessage("");
    setValue("registrationEnd", dayjs(date).format("YYYY-MM-DDTHH:mm:ss"), {
      shouldValidate: true,
    });
  };

  return (
    <div className="my-3">
      <MeetingDateTimeField
        meetingDateTime={meetingDateTime}
        setMeetingDateTime={handleMeetingDateChange}
        deadlineDateTime={deadlineDateTime}
        setDeadlineDateTime={handleDeadlineDateChange}
      />
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
