import Person from "@/images/person.svg";

export default function CapacityStatus({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[2px] text-gray-700">
      <Person />
      <span>{children}</span>
    </div>
  );
}
