"use client";

import { WelcomeMessage } from "@/components/ui/WelcomeMessage";
import { Travel } from "@/components/ui/rides/Travel";
import { DynamicTravelMap } from "@/components/ui/rides/DynamicTravelMap";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
  const { isAuthenticated, success } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !success) {
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
        <WelcomeMessage />
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
