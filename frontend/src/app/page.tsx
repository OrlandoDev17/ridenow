"use client";

import { WelcomeMessage } from "@/components/ui/WelcomeMessage";
import { Travel } from "@/components/ui/rides/Travel";
import { DynamicTravelMap } from "@/components/ui/rides/DynamicTravelMap";
import { useState } from "react";
import L from "leaflet";

export default function RidesPage() {
  const [origin, setOrigin] = useState<{
    latlng: L.LatLng;
    name: string;
  } | null>(null);
  const [destination, setDestination] = useState<{
    latlng: L.LatLng;
    name: string;
  } | null>(null);
  return (
    <>
      <main className="flex relative max-w-11/12 mx-auto w-full">
        <WelcomeMessage />
        <Travel
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
        />
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
