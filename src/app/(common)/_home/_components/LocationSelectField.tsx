"use client";

import { useState } from "react";
import LocationSelect from "@/components/Filtering/LocationSelect";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormDataType } from "../_hooks/useCreateGathering";

type LocationSelectFieldProps = {
  register: UseFormRegister<FormDataType>;
  setValue: UseFormSetValue<FormDataType>;
  watch: UseFormWatch<FormDataType>;
  errors: FieldErrors<FormDataType>;
};

export default function LocationSelectField({ setValue, watch, errors }: LocationSelectFieldProps) {
  const selectedLocation = watch("location") || "";
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="my-3">
      <label className="mb-3 text-base font-semibold">장소</label>
      <LocationSelect
        selectedLocation={selectedLocation}
        setSelectedLocation={(location) => {
          if (!location) {
            setErrorMessage("위치를 선택해주세요.");
            return;
          }
          setErrorMessage("");
          setValue("location", location || "", { shouldValidate: true });
        }}
        className="w-full border-none text-gray-400"
      />
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
