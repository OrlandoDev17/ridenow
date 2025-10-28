"use client";

import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/Icons";
import { REGISTER_FORM } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { FormValues } from "@/lib/types";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    formValues,
    setFormValues,
    role,
    setRole,
    register,
    loading,
    error,
    success,
    isAuthenticated,
  } = useAuth();

  const router = useRouter();

  const handleTogglePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleRole = (role: string) => {
    setRole(role);
    console.log(role);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues: FormValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (success && isAuthenticated) {
      if (role === "CLIENT") {
        router.push("/clientRides");
      }

      if (role === "DRIVER") {
        router.push("/driverRides");
      }

      if (role === "ADMIN") {
        router.push("/admin");
      }
    }
  }, [success, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
      {REGISTER_FORM.map(({ id, type, placeholder, required, name }) => (
        <label className="flex flex-col gap-2 relative" key={id}>
          <input
            className="px-4 py-3 bg-secondary xs:bg-primary rounded-lg focus:outline-none focus:border-blue-500 transition"
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
              className="absolute right-2 bottom-3"
            >
              {isVisible ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </label>
      ))}
      <div className="grid grid-cols-2 gap-2">
        <button
          className={`px-4 py-3   rounded-lg transition ${
            role === "CLIENT" ? "bg-blue-500" : "bg-secondary xs:bg-primary"
          }`}
          type="button"
          onClick={() => handleRole("CLIENT")}
        >
          Eres cliente?
        </button>
        <button
          className={`px-4 py-3 rounded-lg focus:outline-none transition ${
            role === "DRIVER" ? "bg-blue-500" : "bg-secondary xs:bg-primary"
          }`}
          type="button"
          onClick={() => handleRole("DRIVER")}
        >
          Eres conductor?
        </button>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm text-center">Registro exitoso</p>
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
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}
