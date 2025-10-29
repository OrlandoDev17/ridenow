import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { PendingRide } from "@/lib/types";

export function useDriverSocket(onNewRide: (ride: PendingRide) => void) {
  useEffect(() => {
    socket.emit("joinConductores");

    socket.on("nuevoViaje", (ride) => {
      console.log("Nuevo viaje recibido", ride);
      onNewRide(ride);
    });

    return () => {
      socket.off("nuevoViaje");
    };
  }, []);
}
