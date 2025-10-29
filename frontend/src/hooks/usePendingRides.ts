import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { PendingRide } from "@/lib/types";

export function usePendingRides() {
  const [rides, setRides] = useState<PendingRide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rides/pending`);
        setRides(res.data.rides);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Error al cargar las solicitudes"
          );
        } else {
          setError("Error inesperado al cargar las solicitudes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  return {
    setRides,
    rides,
    loading,
    error,
  };
}
