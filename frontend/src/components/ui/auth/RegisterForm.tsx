"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/Icons";
import { REGISTER_FORM } from "@/lib/constants";
import { useRegisterContext } from "@/context/RegisterContext";

export function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    formValues,
    setFormValues,
    role,
    setRole,
    submit,
    loading,
    error,
    success,
  } = useRegisterContext();

  const handleTogglePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      {REGISTER_FORM.map(({ id, label, type, placeholder, required, name }) => (
        <label className="flex flex-col gap-2 relative" key={id}>
          <span className="font-medium">{label}</span>
          <input
            className="px-4 py-2 bg-neutral-800 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 transition"
            type={isVisible && type === "password" ? "text" : type}
            placeholder={placeholder}
            required={required}
            name={name}
            onChange={handleChange}
            value={formValues[name] || ""}
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
      ))}

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setRole("CLIENT")}
          className={`cursor-pointer px-4 py-2 rounded-lg transition ${
            role === "CLIENT"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-500 text-white opacity-50 cursor-not-allowed"
          }`}
        >
          Eres Cliente
        </button>
        <button
          type="button"
          onClick={() => setRole("DRIVER")}
          className={`cursor-pointer px-4 py-2 rounded-lg transition ${
            role === "DRIVER"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-500 text-white opacity-50 cursor-not-allowed"
          }`}
        >
          Eres Conductor
        </button>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm text-center">Registro exitoso</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
