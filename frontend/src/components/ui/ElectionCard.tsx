import { ElectionCardProps } from "@/lib/types";

interface Props extends ElectionCardProps {
  onClick: (index: number) => void;
  isSelected?: number | null;
  index: number;
}

export function ElectionCard({
  title,
  icon: Icon,
  text,
  onClick,
  isSelected,
  index,
}: Props) {
  return (
    <div
      onClick={() => onClick(index)}
      className={`flex flex-col gap-4 justify-center items-center z-10 h-full py-8 px-4 rounded-lg border ${
        isSelected === index
          ? "border-blue-500 bg-blue-400/10"
          : "border-gray-600 hover:border-blue-500 bg-primary/70"
      } transition cursor-pointer`}
    >
      <Icon className="size-8 text-blue-500" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{text}</p>
    </div>
  );
}
