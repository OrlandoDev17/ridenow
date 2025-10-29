"use client";

import { RideCard } from "@/components/ui/rides/driver/RideCard";
import { TravelTabs } from "@/components/ui/rides/driver/TravelTabs";
import { usePendingRides } from "@/hooks/usePendingRides";
import { useDriverSocket } from "@/hooks/useDriverSocket";

export default function DriverRidesPage() {
  const { rides, loading, error, setRides } = usePendingRides();

  useDriverSocket((newRide) => {
    setRides((prevRides) => [newRide, ...prevRides]);
  });

  return (
    <main className="flex flex-col gap-8 max-w-11/12 mx-auto w-full mt-12">
      <header className="flex items-center">
        <h1 className="text-4xl font-semibold">Panel de Control</h1>
      </header>
      <TravelTabs />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {loading ? (
          <p>Cargando viajes...</p>
        ) : error ? (
          <p>Error al cargar viajes: {error}</p>
        ) : (
          rides.map((ride) => <RideCard key={ride.id} ride={ride} />)
        )}
      </div>
    </main>
  );
}
