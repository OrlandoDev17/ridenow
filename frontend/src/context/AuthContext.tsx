"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { FormValues } from "@/lib/types";

interface AuthContextType {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  formValues: FormValues;
  role: string;
  logoutSuccess: boolean;
  setLogoutSuccess: (success: boolean) => void;
  setFormValues: (
    values: FormValues | ((prevValues: FormValues) => FormValues)
  ) => void;
  setRole: (role: string) => void;
  login: (cedula: string, password: string) => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    cedula: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  const [role, setRole] = useState<string>("CLIENT");
  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);

  const isAuthenticated = !!token;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    }
  }, []);

  const login = async (cedula: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setLogoutSuccess(false);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        cedula,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user); // ✅ ya tienes el usuario
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setLogoutSuccess(false);

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

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(response.data.user);
      }

      console.log("✅ Registro exitoso:", response.data.user);
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

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setSuccess(false);
    setLogoutSuccess(true);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        error,
        success,
        login,
        register,
        logout,
        formValues,
        setFormValues,
        setRole,
        role,
        logoutSuccess,
        setLogoutSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
