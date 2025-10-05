"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";

interface RegisterData {
  formValues: Record<string, string>;
  setFormValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  role: "CLIENT" | "DRIVER";
  setRole: (role: "CLIENT" | "DRIVER") => void;
  submit: () => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const RegisterContext = createContext<RegisterData | null>(null);

export function useRegisterContext() {
  const context = useContext(RegisterContext);
  if (!context)
    throw new Error("RegisterContext must be used within a provider");
  return context;
}

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [role, setRole] = useState<"CLIENT" | "DRIVER">("CLIENT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        cedula: formValues.cedula,
        name: formValues.name,
        phone: formValues.phone,
        password: formValues.password,
        role,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        payload
      );

      console.log("✅ Registro exitoso:", response.data);
      setSuccess(true);
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Error al registrar"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        formValues,
        setFormValues,
        role,
        setRole,
        submit,
        loading,
        error,
        success,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
