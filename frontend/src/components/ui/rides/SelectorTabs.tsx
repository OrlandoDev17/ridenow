import { motion } from "motion/react";
import { ButtonGroupProps } from "@/lib/types";

interface SelectorTabsProps {
  options: ButtonGroupProps[];
  selected: string;
  onSelect: (value: string) => void;
}

export function SelectorTabs({
  options,
  selected,
  onSelect,
}: SelectorTabsProps) {
  return (
    <div className="grid grid-cols-3 w-full bg-neutral-800 rounded-lg p-1.5">
      {options.map((option) => {
        const isActive = selected === option.id;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="relative px-4 py-2 rounded-md font-medium text-sm text-gray-300 transition-colors duration-200 hover:bg-neutral-700"
          >
            {isActive && (
              <motion.div
                layoutId="tabHighlight"
                className="absolute inset-0 rounded-md bg-primary z-0"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
