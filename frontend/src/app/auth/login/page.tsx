"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

import { LOGIN_FORM } from "@/lib/constants";
import { EyeIcon, EyeOffIcon } from "@/ui/Icons";
import { LoginProps } from "@/lib/types";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const { login, loading, error } = useLogin();

  const handleTogglePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    const credentials: LoginProps = {
      cedula: formValues.cedula.toString(),
      password: formValues.password.toString(),
    };

    login(credentials);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <article
        className="flex flex-col gap-4 py-10 px-8 border border-gray-500 bg-secondary rounded-lg 
      max-w-md w-full"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl text-blue-500 font-bold">RideNow</h2>
          <h3 className="text-2xl font-semibold">Iniciar Sesión</h3>
          <h5 className="text-sm text-gray-500">
            Ingresa a tu cuenta de RideNow
          </h5>
        </div>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          {LOGIN_FORM.map(
            ({ id, label, type, placeholder, required, name }) => (
              <label className="flex flex-col gap-2 relative" key={id}>
                <span className="font-medium">{label}</span>
                <input
                  className="px-4 py-2 bg-neutral-800 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  type={isVisible ? "text" : type}
                  placeholder={
                    isVisible && type === "password"
                      ? "Contraseña"
                      : placeholder
                  }
                  required={required}
                  name={name}
                />
                {type === "password" && (
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute right-2 bottom-2"
                  >
                    {isVisible ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                )}
              </label>
            )
          )}
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg mt-2 hover:bg-blue-600 transition cursor-pointer">
            Iniciar Sesión
          </button>
        </form>
        <span className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          ¿No tienes cuenta?
          <a
            href="/auth/register"
            className=" text-blue-400 font-semibold hover:underline transition"
          >
            Regístrate Aquí
          </a>
        </span>
        <a
          className="text-center text-gray-400 text-sm hover:text-white transition"
          href="/"
        >
          Volver al Inicio
        </a>
      </article>
    </main>
  );
}
