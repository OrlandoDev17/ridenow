"use client";

import { useState } from "react";
import { MenuIcon } from "../ui/Icons";
import { AnimatePresence, motion } from "motion/react";
import { MenuContent } from "./MenuContent";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("overflow-hidden");
  };
  return (
    <>
      <button onClick={handleOpen}>
        <MenuIcon className="p-2 size-11 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer" />
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.article
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="bg-secondary w-full inset-0 absolute z-[1100] flex flex-col gap-4 py-4 px-6"
          >
            <MenuContent onClose={handleOpen} />
          </motion.article>
        )}
      </AnimatePresence>
    </>
  );
}
