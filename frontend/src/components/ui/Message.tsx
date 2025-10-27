"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { XIcon } from "./Icons";
import { useMessage } from "@/context/MessageContext";

interface MessageProps {
  name: string;
  action: "login" | "ride" | "profile";
}

export function Message({ name, action = "login" }: MessageProps) {
  const { showMessage, setShowMessage } = useMessage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showMessage]);

  const handleClose = () => {
    setShowMessage(false);
  };

  useEffect(() => {
    setShowMessage(true);
  }, [name, action, setShowMessage]);

  const firstName = name.split(" ")[0];

  const messages = {
    login: {
      title: `Bienvenido ${firstName} 🎉`,
      message: "Sesión iniciada correctamente",
    },
    ride: {
      title: "Viaje solicitado con éxito 🎉",
      message: "Un conductor se pondrá en contacto con usted pronto",
    },
    profile: {
      title: "Perfil actualizado con éxito 🎉",
      message: "Sus datos han sido actualizados correctamente",
    },
  };

  const firstLetterNameAndLastName = (name: string) =>
    name
      .split(" ")[0]
      .charAt(0)
      .toUpperCase()
      .concat(name.split(" ")[1].charAt(0).toUpperCase());

  return (
    <AnimatePresence mode="wait">
      {showMessage && (
        <motion.article
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-8 fixed top-10 left-1/2 -translate-x-1/2 w-fit lg:max-w-lg z-[1500] 
          bg-gray-900 dark:bg-gray-800 border border-gray-700 rounded-lg 
          p-6 shadow-xl"
        >
          <span className="p-3 flex items-center justify-center text-xl font-semibold bg-blue-500/10 border border-blue-500 rounded-full">
            {firstLetterNameAndLastName(name)}
          </span>
          <div>
            <h2 className="text-base lg:text-xl font-semibold">
              {messages[action].title}
            </h2>
            <p className="text-xs lg:text-base text-gray-400 max-w-xs">
              {messages[action].message}
            </p>
          </div>
          <button onClick={handleClose}>
            <XIcon className="p-2 size-11 rounded-lg hover:bg-red-400 transition-all cursor-pointer" />
          </button>
        </motion.article>
      )}
    </AnimatePresence>
  );
}
