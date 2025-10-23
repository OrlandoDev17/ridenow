"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LOGIN_FORM } from "@/lib/constants";
import { EyeIcon, EyeOffIcon } from "@/ui/Icons";
import { LoginProps } from "@/lib/types";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const { login, loading, error, success, isAuthenticated } = useAuth();

  const router = useRouter();

  const handleTogglePassword = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (success && isAuthenticated) {
      router.push("/");
    }
  }, [success, isAuthenticated]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    const credentials: LoginProps = {
      cedula: formValues.cedula.toString(),
      password: formValues.password.toString(),
    };

    login(credentials.cedula, credentials.password);
  };

  const variants = {
    initial: {
      opacity: 0,
      y: 40,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -40,
    },
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <AnimatePresence mode="wait">
        <motion.article
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 py-8 px-8 max-w-md w-full xs:bg-secondary rounded-2xl sm:shadow-xl"
        >
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-3xl font-semibold">Iniciar Sesión</h3>
            <h5 className="text-sm text-gray-500">
              Ingresa a tu cuenta de RideNow
            </h5>
          </div>
          <form className="flex flex-col gap-8 mt-4" onSubmit={handleSubmit}>
            {LOGIN_FORM.map((form) => (
              <input
                key={form.id}
                type={form.type}
                placeholder={form.placeholder}
                required={form.required}
                name={form.name}
                className="px-4 py-4 rounded-xl bg-secondary sm:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            ))}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">
                Sesión iniciada exitosamente
              </p>
            )}
            <button
              className={`cursor-pointer px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center gap-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </button>
          </form>
          <span className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            ¿No tienes cuenta?
            <a
              href="/auth/register"
              className=" text-blue-400 hover:underline transition"
            >
              Regístrate Aquí
            </a>
          </span>
        </motion.article>
      </AnimatePresence>
    </main>
  );
}
