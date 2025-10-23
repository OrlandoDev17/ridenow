"use client";

import { RegisterForm } from "@/ui/auth/RegisterForm";
import { AnimatePresence, motion } from "motion/react";

export default function RegisterPage() {
  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <AnimatePresence>
        <motion.article
          className="flex flex-col gap-4 py-10 px-8 xs:bg-secondary rounded-2xl max-w-md w-full"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-3xl font-semibold">Registro</h3>
            <h5 className="text-sm text-gray-500">Crea tu cuenta en RideNow</h5>
          </div>

          <RegisterForm />

          <span className="flex items-center justify-center gap-2 text-sm text-gray-400">
            ¿Ya tienes una cuenta?
            <a
              className="text-blue-500 hover:underline transition"
              href="/auth/login"
            >
              inicia sesión aquí
            </a>
          </span>
        </motion.article>
      </AnimatePresence>
    </main>
  );
}
