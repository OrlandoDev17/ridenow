import { useState } from "react";
import axios, { AxiosError } from "axios";
import { APIError, LoginProps, User, Driver } from "@/lib/types";

/**
 * Hook personalizado para manejar el login de cliente o conductor
 * - Envía credenciales al backend
 * - Guarda el token JWT y los datos del usuario en localStorage
 * - Expone estados de carga, error y función login
 */
export function useLogin() {
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [success, setSuccess] = useState<boolean>(false); // Estado de exito
  const [token, setToken] = useState<string | null>(null); // Token JWT recibido
  const [profile, setProfile] = useState<User | Driver | null>(null); // Datos del usuario

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL_DEV;

  const login = async ({ cedula, password }: LoginProps) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        cedula,
        password,
      });

      const receivedToken = response.data.token;
      const userData = response.data.user || response.data.driver;

      // Guardamos el token y los datos en localStorage
      localStorage.setItem("ridenow_token", receivedToken);
      localStorage.setItem("ridenow_user", JSON.stringify(userData));

      setToken(receivedToken);
      setProfile(userData);
      setSuccess(true);

      // ✅ Mostrar todos los datos en consola
      console.log("✅ Inicio de sesión exitoso:");
      console.log("Token:", receivedToken);
      console.log("Usuario:", userData);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<APIError>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          "Error al iniciar sesión"
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success, token, profile };
}
