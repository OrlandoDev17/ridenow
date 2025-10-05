"use client";

import { useState } from "react";
import { RegisterForm } from "@/ui/auth/RegisterForm";
import { AnimatePresence, motion } from "motion/react";
import {
  useRegisterContext,
  RegisterProvider,
} from "@/context/RegisterContext";

function RegisterPageContent() {
  const [step, setStep] = useState(1);
  const { role, setRole } = useRegisterContext();

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <AnimatePresence>
        <motion.article
          className="flex flex-col gap-4 py-6 px-8 border border-gray-500 bg-secondary rounded-lg max-w-md w-full"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl text-blue-500 font-bold">RideNow</h2>
            <h3 className="text-2xl font-semibold">Registro</h3>
            <h5 className="text-sm text-gray-500">Crea tu cuenta en RideNow</h5>
          </div>

          <RegisterForm />

          <button
            className="text-gray-500 hover:text-white transition"
            onClick={() => setStep(step - 1)}
          >
            Volver
          </button>
        </motion.article>
      </AnimatePresence>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <RegisterProvider>
      <RegisterPageContent />
    </RegisterProvider>
  );
}
