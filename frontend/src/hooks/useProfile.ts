import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { token } = useAuth();

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al obtener perfil");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`${API_URL}/api/user/me`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
      res.data.user === "" || res.data.user === null
        ? setError("No hay datos para actualizar")
        : setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  return {
    profile,
    loading,
    error,
    success,
    fetchProfile,
    updateProfile,
  };
};
