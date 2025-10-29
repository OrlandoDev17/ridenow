import { PendingRide } from "@/lib/types";
import { CalendarIcon, LocationIcon, MapIcon, PhoneIcon } from "../../Icons";
import { useAcceptRide } from "@/hooks/useAcceptRide";

interface RideCardProps {
  ride: PendingRide;
}

export function RideCard({ ride }: RideCardProps) {
  const {
    origin,
    destination,
    requestedAt,
    note,
    cliente: { name, photoUrl, cedula, phone },
  } = ride;

  const { acceptRide } = useAcceptRide();

  const handleAccept = async () => {
    try {
      await acceptRide(ride.id, ride.fare || 10.5); // usa tarifa real si existe
      console.log("✅ Viaje aceptado");
      // Opcional: eliminar de la lista o mostrar confirmación
    } catch (error) {
      console.error("❌ Error al aceptar viaje:", error);
    }
  };

  const nameInitials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const formatDate = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  }).format(new Date(requestedAt));

  return (
    <article className="flex flex-col gap-4 rounded-xl bg-secondary py-6 px-8 w-full">
      <header className="flex items-center justify-between border-b border-gray-500 pb-4">
        <picture className="flex items-center gap-4">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div
              className="size-14 bg-blue-500/10 rounded-full flex items-center justify-center 
            text-white text-lg font-bold"
            >
              {nameInitials}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <h4 className="text-gray-300">V-{cedula}</h4>
          </div>
        </picture>
        <p className="text-2xl font-bold text-green-400">$10.5</p>
      </header>
      <div className="flex flex-col gap-2 [&>p]:flex [&>p]:items-center [&>p]:gap-3 [&>p]:text-lg [&>p]:text-gray-300 [&>p>span]:text-white [&>p>span]:font-mediumss">
        <p>
          <LocationIcon />
          Origen: <span>{origin}</span>
        </p>
        <p>
          <MapIcon />
          Destino: <span>{destination}</span>
        </p>
        <p>
          <CalendarIcon />
          Fecha: <span>{formatDate}</span>
        </p>
        {note && (
          <p>
            Nota: <span>{note}</span>
          </p>
        )}
        <p>
          <PhoneIcon />
          Telefono: <span>{phone}</span>
        </p>
      </div>
      <footer className="pt-4">
        <button
          className="w-full py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600
        cursor-pointer transition-all"
          onClick={handleAccept}
        >
          Aceptar Viaje
        </button>
      </footer>
    </article>
  );
}
