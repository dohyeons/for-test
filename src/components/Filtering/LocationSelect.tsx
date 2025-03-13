"use client";

import Dropdown from "@/components/Dropdown";

type LocationSelectProps = {
  className?: string;
  selectedLocation?: string;
  setSelectedLocation?: (location: string | undefined) => void;
};

export default function LocationSelect({
  className,
  selectedLocation = "전체 지역",
  setSelectedLocation,
}: LocationSelectProps) {
  const locations: string[] = ["전체 지역", "건대입구", "을지로3가", "신림", "홍대입구"];

  return (
    <div className="flex w-full">
      <Dropdown
        options={locations}
        selected={selectedLocation}
        onSelect={(location) => {
          if (setSelectedLocation) {
            setSelectedLocation(location === "전체 지역" ? undefined : location);
          }
        }}
        placeholder="지역 선택"
        className={className}
      />
    </div>
  );
}
