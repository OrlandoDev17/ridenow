"use client";

import { useState, useEffect } from "react";
import { Travel } from "@/components/ui/rides/client/Travel";
import { DynamicTravelMap } from "@/components/ui/rides/client/DynamicTravelMap";

import { useAuth } from "@/context/AuthContext";
import { Message } from "@/components/ui/Message";
import { useMessage } from "@/context/MessageContext";
import { MapLocation, AssignedRide } from "@/lib/types";
import { socket } from "@/lib/socket";
import { AssignedRideCard } from "@/components/ui/rides/client/AssignedRideCard";

export default function ClientRidesPage() {
  const [origin, setOrigin] = useState<MapLocation | null>(null);
  const [destination, setDestination] = useState<MapLocation | null>(null);
  const [assignedRide, setAssignedRide] = useState<AssignedRide | null>(null);

  const { user, success } = useAuth();
  const { showMessage, requestRide } = useMessage();

  // 🔌 Escuchar evento de asignación
  useEffect(() => {
    if (!user?.cedula) return;

    socket.emit("join", user.cedula);

    socket.on("viajeAsignado", ({ rideId, conductor, fare }) => {
      console.log("🚕 Viaje asignado:", conductor);
      setAssignedRide({
        id: rideId,
        conductor,
        fare,
        status: "ASSIGNED",
      });
    });

    return () => {
      socket.off("viajeAsignado");
    };
  }, [user?.cedula]);

  return (
    <main className="flex flex-col lg:flex-row relative max-w-11/12 mx-auto w-full">
      {assignedRide ? (
        <AssignedRideCard ride={assignedRide} />
      ) : (
        <>
          {user?.name && requestRide && showMessage && (
            <Message name={user.name} action="ride" />
          )}
          {user?.name && success && !requestRide && (
            <Message name={user.name} action="login" />
          )}
          <aside className="flex flex-col gap-6 max-w-full lg:max-w-md 2xl:max-w-lg w-full py-6 lg:pr-16 h-full order-2 lg:order-1">
            <Travel origin={origin} destination={destination} />
          </aside>
          <div className="w-full h-auto lg:h-[calc(100vh-5.1rem)] order-1 lg:order-2">
            <DynamicTravelMap
              origin={origin}
              destination={destination}
              setOrigin={setOrigin}
              setDestination={setDestination}
            />
          </div>
        </>
      )}
    </main>
  );
}
