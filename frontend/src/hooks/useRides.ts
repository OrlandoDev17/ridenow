import { useState } from "react";
import axios from "axios";
import type { UseRidesRequest } from "@/lib/types";

export function useRides() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rideData, setRideData] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const solicitarViaje = async ({
    origin,
    destination,
    userCedula,
    scheduled,
    paymentMethod,
    travelOption,
  }: UseRidesRequest) => {
    if (!origin || !destination || !userCedula) {
      setError("Faltan datos para solicitar el viaje");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const body: any = {
        origin: origin.name,
        destination: destination.name,
        clientCedula: userCedula,
        paymentMethod,
        travelOption,
        scheduled,
      };

      // Agregar coordenadas solo si están disponibles
      if (origin.latlng?.lat !== undefined) body.originLat = origin.latlng.lat;
      if (origin.latlng?.lng !== undefined) body.originLng = origin.latlng.lng;
      if (destination.latlng?.lat !== undefined)
        body.destinationLat = destination.latlng.lat;
      if (destination.latlng?.lng !== undefined)
        body.destinationLng = destination.latlng.lng;

      const res = await axios.post(`${API_URL}/api/rides`, body);

      setRideData(res.data);
      console.log("🚗 Viaje creado:", res.data);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error al solicitar viaje:", err);
      setError(err?.response?.data?.error || "Error al solicitar viaje");
    } finally {
      setLoading(false);
    }
  };

  return {
    solicitarViaje,
    loading,
    error,
    rideData,
  };
}
