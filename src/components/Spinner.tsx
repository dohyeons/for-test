type SpinnerProps = {
  color?: "gray" | "white";
};

export default function Spinner({ color = "gray" }: SpinnerProps) {
  const spinnerColors = {
    white: "border-white",
    gray: "border-gray-400",
  };
  return (
    <div className="flex w-full justify-center">
      <span className={`size-5 animate-spin rounded-full border-2 border-t-transparent ${spinnerColors[color]}`} />
    </div>
  );
}
