type DashedLineProps = {
  className?: string;
};

export default function DashedLine({ className }: DashedLineProps) {
  return (
    <hr
      className={`h-[2px] w-full border-none bg-[repeating-linear-gradient(90deg,#E5E7EB,#E5E7EB_5px,transparent_5px,transparent_10px)] ${className}`}
    />
  );
}
