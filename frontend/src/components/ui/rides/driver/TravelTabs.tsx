import { TRAVEL_TABS } from "@/lib/constants";
import { useState } from "react";
import { motion } from "motion/react";

export function TravelTabs({}) {
  const [selectedTab, setSelectedTab] = useState("available");

  const handleSelectTab = (id: string) => {
    setSelectedTab(id);
  };

  return (
    <div className="flex items-center gap-4 bg-secondary w-fit p-2 rounded-xl">
      {TRAVEL_TABS.map(({ id, label }) => (
        <button
          key={id}
          className={`font-medium py-2 px-6 rounded-lg z-10 relative cursor-pointer`}
          onClick={() => handleSelectTab(id)}
        >
          {selectedTab === id && (
            <motion.div
              layoutId="highlight"
              className="absolute inset-0 bg-blue-500 rounded-lg z-0"
              transition={{ type: "tween", duration: 0.2 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  );
}
