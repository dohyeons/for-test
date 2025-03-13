import Avatar from "@/components/Avatar";

type GatheredProfilesProps = {
  profileImages: (string | null)[];
};

export default function GatheredProfiles({ profileImages }: GatheredProfilesProps) {
  const count = profileImages.length;

  const rows = [];
  for (let i = 0; i < profileImages.length; i += 4) {
    rows.push(profileImages.slice(i, i + 4));
  }

  return (
    <div className="group relative cursor-default" aria-label="모암 참여자 프로필 이미지 목록">
      <div className="flex transition-transform duration-200 ease-out hover:scale-105">
        {profileImages.slice(0, 4).map((imageUrl, index) => (
          <div key={index} className={`relative ${index !== 0 ? "-ml-3" : ""}`}>
            <Avatar size="sm" imageUrl={imageUrl} />
          </div>
        ))}
        {count > 4 && (
          <div className="z-10 -ml-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">
            {`+${count - 4}`}
          </div>
        )}
      </div>
      <div
        className="pointer-events-none absolute left-1/2 z-50 mt-1 -translate-x-1/2 transform rounded-md border border-gray-100 bg-white/80 p-2 opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100"
        role="tooltip"
        aria-hidden={true}
      >
        <div className="flex flex-col gap-2">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex translate-y-4 justify-start gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              style={{ transitionDelay: `${rowIndex * 200}ms` }}
            >
              {row.map((url, colIndex) => (
                <Avatar key={colIndex} size="sm" imageUrl={url} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
