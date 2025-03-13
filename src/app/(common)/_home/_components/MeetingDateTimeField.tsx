"use client";

import React from "react";
import DateTimePicker from "@/components/Filtering/DateTimePicker";

type MeetingDateTimeFieldProps = {
  meetingDateTime: Date | null;
  setMeetingDateTime: (dateTime: Date | null) => void;
  deadlineDateTime: Date | null;
  setDeadlineDateTime: (dateTime: Date | null) => void;
};

export default function MeetingDateTimeField({
  meetingDateTime,
  setMeetingDateTime,
  deadlineDateTime,
  setDeadlineDateTime,
}: MeetingDateTimeFieldProps) {
  return (
    <div className="my-3 flex flex-col gap-3 md:flex-row">
      {/* 모임 날짜 & 시간 */}
      <div>
        <label className="mb-1 text-base font-semibold">모임 날짜</label>
        <DateTimePicker selectedDateTime={meetingDateTime} onDateTimeChange={setMeetingDateTime} />
      </div>

      {/* 모집 마감 날짜 & 시간 */}
      <div>
        <label className="mb-1 text-base font-semibold">모집 마감 날짜</label>
        <DateTimePicker selectedDateTime={deadlineDateTime} onDateTimeChange={setDeadlineDateTime} />
      </div>
    </div>
  );
}
