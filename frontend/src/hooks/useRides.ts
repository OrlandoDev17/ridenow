import { useState } from "react";
import axios from "axios";
import L from "leaflet";

interface UseRidesProps {
  origin: { latlng: L.LatLng; name: string } | null;
  destination: { latlng: L.LatLng; name: string } | null;
  userCedula: string | null;
  scheduled: boolean;
  paymentMethod: "CASH" | "PAGO_MOVIL" | "CREDITS";
  travelOption: "ONE_WAY" | "ROUND_TRIP";
}

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
  }: UseRidesProps) => {
    if (!origin || !destination || !userCedula) {
      setError("Faltan datos para solicitar el viaje");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/api/rides`, {
        origin: origin.name,
        originLat: origin.latlng.lat,
        originLng: origin.latlng.lng,
        destination: destination.name,
        destinationLat: destination.latlng.lat,
        destinationLng: destination.latlng.lng,
        clientCedula: userCedula,
        paymentMethod,
        travelOption,
        scheduled,
      });

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
