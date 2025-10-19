"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { XIcon } from "./Icons";

export function WelcomeMessage() {
  const { user, isAuthenticated, loading, success } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (success && isAuthenticated && user?.name) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [success, isAuthenticated, user?.name, loading]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isAuthenticated || !user?.name) {
    return null;
  }

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const getRandomColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-700",
      "bg-gradient-to-br from-green-500 to-green-700",
      "bg-gradient-to-br from-purple-500 to-purple-700",
      "bg-gradient-to-br from-pink-500 to-pink-700",
      "bg-gradient-to-br from-indigo-500 to-indigo-700",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-[500] max-w-sm bg-gray-900 dark:bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            {/* Profile Circle */}
            <div
              className={`w-12 h-12 ${getRandomColor(
                user.name
              )} rounded-full flex items-center justify-center text-white font-bold text-lg`}
            >
              {getInitial(user.name)}
            </div>

            {/* Welcome Message */}
            <div className="flex-1">
              <h3 className="font-semibold text-white" title={user.name}>
                ¡Bienvenido, {user.name.split(" ")[0]}! 👋
              </h3>
              <p className="text-sm text-gray-300">
                ¡Sesión iniciada correctamente!
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-white text-xl"
              aria-label="Cerrar mensaje"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
