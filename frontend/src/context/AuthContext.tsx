"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { FormValues, AuthContextType } from "@/lib/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    token: null as string | null,
    user: null as any,
    isAuthenticated: false,
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null as string | null,
    success: false,
    logoutSuccess: false,
    isHydrated: false,
  });

  const [formValues, setFormValues] = useState<FormValues>({
    cedula: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });

  const [role, setRole] = useState<string>("CLIENT");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedToken !== "undefined") {
      setAuth((prev) => ({
        ...prev,
        token: storedToken,
        isAuthenticated: true,
      }));
    }

    if (storedUser && storedUser !== "undefined") {
      setAuth((prev) => ({
        ...prev,
        user: JSON.parse(storedUser),
      }));
    }

    setStatus((prev) => ({ ...prev, isHydrated: true }));
  }, []);

  const login = async (cedula: string, password: string) => {
    setStatus((prev) => ({
      ...prev,
      loading: true,
      error: null,
      success: false,
      logoutSuccess: false,
    }));

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        cedula,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setAuth({
        token: res.data.token,
        user: res.data.user,
        isAuthenticated: true,
      });

      setStatus((prev) => ({ ...prev, success: true }));
    } catch (err: any) {
      setStatus((prev) => ({
        ...prev,
        error: err.response?.data?.message || "Error al iniciar sesión",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const register = async () => {
    setStatus((prev) => ({
      ...prev,
      loading: true,
      error: null,
      success: false,
      logoutSuccess: false,
    }));

    try {
      const payload = {
        cedula: formValues.cedula,
        name: formValues.name,
        phone: formValues.phone,
        password: formValues.password,
        role,
      };

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        payload
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setAuth({
          token,
          user: response.data.user,
          isAuthenticated: true,
        });
      }

      console.log("✅ Registro exitoso:", response.data.user);
      setStatus((prev) => ({ ...prev, success: true }));
    } catch (err: any) {
      console.error("❌ Error:", err);
      setStatus((prev) => ({
        ...prev,
        error:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Error al registrar",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuth({
      token: null,
      user: null,
      isAuthenticated: false,
    });

    setStatus((prev) => ({
      ...prev,
      success: false,
      logoutSuccess: true,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        isHydrated: status.isHydrated,
        loading: status.loading,
        error: status.error,
        success: status.success,
        logoutSuccess: status.logoutSuccess,
        login,
        register,
        logout,
        formValues,
        setFormValues,
        setRole,
        role,
        setLogoutSuccess: (success: boolean) =>
          setStatus((prev) => ({ ...prev, logoutSuccess: success })),
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
