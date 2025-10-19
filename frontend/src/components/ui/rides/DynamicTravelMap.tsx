"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Props } from "./TravelMap";

// Dynamic import of TravelMap component with no SSR
const TravelMap = dynamic(
  () => import("./TravelMap").then((mod) => ({ default: mod.TravelMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-2xl">
        <div className="text-slate-600">Cargando mapa...</div>
      </div>
    ),
  }
);

interface TravelMapProps extends Props {}

export function DynamicTravelMap(props: TravelMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-2xl">
        <div className="text-slate-600">Cargando mapa...</div>
      </div>
    );
  }

  return <TravelMap {...props} />;
}
