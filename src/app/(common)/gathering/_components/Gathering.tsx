import GatheringInfo from "@/app/(common)/gathering/_components/GatheringInfo";
import Thumbnail from "@/app/(common)/gathering/_components/Thumbnail";
import type { GatheringType } from "@/types";

type GatheringProps = {
  gatheringId: string;
  gathering: GatheringType;
  profileImages?: (string | null)[];
};

export default function Gathering({ gatheringId, gathering, profileImages }: GatheringProps) {
  return (
    <div className="flex flex-col items-center gap-4 pt-6 md:flex-row lg:pt-10">
      <Thumbnail name={gathering.name} imageUrl={gathering.image} registrationEnd={gathering.registrationEnd} />
      <GatheringInfo gatheringId={gatheringId} gathering={gathering} profileImages={profileImages} />
    </div>
  );
}
