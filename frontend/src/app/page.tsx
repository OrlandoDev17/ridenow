"use client";

import { Travel } from "@/components/ui/rides/Travel";
import { DynamicTravelMap } from "@/components/ui/rides/DynamicTravelMap";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Message } from "@/components/ui/Message";
import { useMessage } from "@/context/MessageContext";

export default function RidesPage() {
  const [origin, setOrigin] = useState<{
    latlng: L.LatLng;
    name: string;
  } | null>(null);
  const [destination, setDestination] = useState<{
    latlng: L.LatLng;
    name: string;
  } | null>(null);

  const router = useRouter();
  const { user, success } = useAuth();

  const { showMessage, requestRide } = useMessage();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  // useEffect(() => {
  //   const fetchAdminData = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3001/api/admin");
  //       const data = await res.json();

  //       console.log("📦 Usuarios:", data.users);
  //       console.log("🚗 Viajes:", data.rides);
  //     } catch (error) {
  //       console.error("❌ Error al obtener datos del admin:", error);
  //     }
  //   };

  //   fetchAdminData();
  // }, []);

  return (
    <>
      <main className="flex relative max-w-11/12 mx-auto w-full">
        {user?.name && requestRide && showMessage && (
          <Message name={user.name} action="ride" />
        )}
        {user?.name && success && !requestRide && (
          <Message name={user.name} action="login" />
        )}
        <Travel origin={origin} destination={destination} />
        <div className="w-full h-[calc(100vh-5.1rem)]">
          <DynamicTravelMap
            origin={origin}
            destination={destination}
            setOrigin={setOrigin}
            setDestination={setDestination}
          />
        </div>
      </main>
    </>
  );
}
