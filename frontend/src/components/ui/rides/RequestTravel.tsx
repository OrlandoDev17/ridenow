"use client";

import { LocationIcon } from "../Icons";
import { useState } from "react";
import { MapaCharallave } from "./MapaCharallave";

export function RequestTravel() {
  const [origen, setOrigen] = useState({ lat: 0, lng: 0 });

  const handleGeolocationByIP = async () => {
    try {
      const res = await fetch("https://ipinfo.io/json?token=tu_token_opcional");
      const data = await res.json();

      const [lat, lng] = data.loc.split(",").map(Number);
      setOrigen({ lat, lng });
      console.log("📍 Ubicación por IP:", lat, lng);
    } catch (err) {
      console.warn("🌐 Error al obtener ubicación por IP");
      setOrigen({ lat: 10.24306, lng: -66.86222 });
    }
  };

  return (
    <div className="flex gap-8">
      <article className="flex flex-col gap-4 p-6 bg-secondary border border-gray-700 rounded-lg max-w-2xl w-full">
        <header className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2 text-2xl font-semibold">
            <LocationIcon className="size-8 text-blue-500" />
            Solicitar Viaje
          </h3>
          <h5 className="text-gray-500">Completa los datos para tu viaje</h5>
        </header>
        <h3 className="text-lg font-semibold">Dirección de origen</h3>

        <input
          type="text"
          placeholder="Ej. Plaza Bolívar"
          className="px-4 py-2 rounded-lg bg-neutral-800 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors duration-200"
        />

        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
          onClick={() => {
            handleGeolocationByIP();
          }}
        >
          Compartir ubicación actual
        </button>
      </article>
      <article className="flex-1">
        <MapaCharallave />
      </article>
    </div>
  );
}
// 10°14'35.0"N 66°51'44.0"W
