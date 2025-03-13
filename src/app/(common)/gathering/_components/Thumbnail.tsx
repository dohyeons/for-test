import Image from "next/image";
import Tag from "@/components/Tag";

type ThumbnailProps = {
  name: string;
  imageUrl: string;
  registrationEnd: string;
};

export default function Thumbnail({ name, imageUrl, registrationEnd }: ThumbnailProps) {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-3xl border-2 border-gray-200 md:h-60 lg:h-[270px]">
      <Image
        src={imageUrl ?? "/images/default_image.png"}
        alt={`${name} 모임 이미지`}
        fill
        sizes="(max-width: 640px) 343px 180px, (max-width: 768px) 340px 240px, 486px 270px"
        objectFit="cover"
        className="w-full"
      />
      <Tag registrationEnd={registrationEnd} />
    </div>
  );
}
