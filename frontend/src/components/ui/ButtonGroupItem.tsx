import { ButtonGroupProps } from "@/lib/types";
import { motion } from "motion/react";

export function ButtonGroupItem({
  id,
  label,
  onClick,
  selected,
  className,
}: ButtonGroupProps) {
  const isActive = selected === id;

  return (
    <button
      onClick={() => onClick?.()}
      className={`relative px-12 py-2.5 rounded-md font-medium cursor-pointer text-gray-300 transition-colors duration-200 ${className}`}
    >
      {isActive && (
        <motion.div
          layoutId="activeButton"
          className="absolute inset-0 rounded-md bg-primary z-0"
          transition={{ type: "tween", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
