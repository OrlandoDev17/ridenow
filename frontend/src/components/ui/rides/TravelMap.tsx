"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import L from "leaflet";
import axios, { AxiosError } from "axios";
import { APIError, MapProps } from "@/lib/types";
import "leaflet/dist/leaflet.css";
import "@/styles/leafletOverrides.css";

const originIcon = L.divIcon({
  className: "origin-marker",
  html: `<div class="w-6 h-6 rounded-full border-2 border-white bg-red-600 shadow-lg"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const destinationIcon = L.divIcon({
  className: "destination-marker",
  html: `<div class="w-6 h-6 rounded-full border-2 border-white bg-blue-600 shadow-lg"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const ClickHandler = ({
  onMapClick,
}: {
  onMapClick: (latlng: L.LatLng) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

export function TravelMap({
  center = [10.243, -66.857] as L.LatLngTuple,
  zoom = 15,
  width = "100%",
  height = "96%",
  setOrigin,
  setDestination,
  origin,
  destination,
}: MapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Estado de seleccion
  const [placing, setPlacing] = useState("origin");

  // Marcadores y nombres

  // Para mostrar informacion en la UI
  const [loadingName, setLoadingName] = useState(false);
  const [errorName, setErrorName] = useState<string | null>(null);

  // Funcion para reverse geocoding
  const reverseGeocode = async (lat: number, lon: number) => {
    setLoadingName(true);
    setErrorName(null);

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const { data } = await axios.get(url, {
        headers: { "Accept-Language": "es", "User-Agent": "RideNow" },
      });

      const name = data.display_name || `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      setLoadingName(false);
      return name;
    } catch (error: unknown) {
      const AxiosError = error as AxiosError<APIError>;
      setErrorName(
        AxiosError.response?.data?.message ||
          "Error al obtener el nombre del lugar"
      );
      return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
    } finally {
      setLoadingName(false);
    }
  };

  // Handler cuando se hace click en el mapa
  const handleMapClick = async (latlng: L.LatLng) => {
    const { lat, lng } = latlng;
    const name = await reverseGeocode(lat, lng);

    if (placing === "origin") {
      setOrigin({ latlng, name });
    } else {
      setDestination({ latlng, name });
    }
  };

  // tile layer (MapTiler) - usa variable de entorno VITE_MAPTILER_KEY
  const TILE_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  const tileUrl = `https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=${TILE_KEY}`;

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10"
      style={{ width, height }}
    >
      {/* Controls simples */}
      <div className="absolute z-[500] left-4 bottom-4 bg-white/90 text-slate-800 p-2 max-w-md rounded-md shadow-md backdrop-blur-md">
        <div className="flex gap-2">
          <button
            onClick={() => setPlacing("origin")}
            className={`px-3 py-1 rounded ${
              placing === "origin"
                ? "bg-red-600 text-white"
                : "bg-white text-black border"
            }`}
          >
            Origen
          </button>
          <button
            onClick={() => setPlacing("destination")}
            className={`px-3 py-1 rounded ${
              placing === "destination"
                ? "bg-blue-600 text-white"
                : "bg-white text-black border"
            }`}
          >
            Destino
          </button>
          <button
            onClick={() => {
              setOrigin(null);
              setDestination(null);
            }}
            className="px-3 py-1 rounded bg-gray-200 text-black border"
          >
            Limpiar
          </button>
        </div>

        <div className="mt-2 text-sm">
          <div>
            Coloca:{" "}
            <strong>
              {placing === "origin" ? "Origen (rojo)" : "Destino (azul)"}
            </strong>
          </div>
          <div className="mt-1">
            <div className="text-xs text-gray-600">Origen:</div>
            <div className="text-sm">
              {origin ? origin.name : "No seleccionado"}
            </div>
            <div className="mt-1 text-xs text-gray-600">Destino:</div>
            <div className="text-sm">
              {destination ? destination.name : "No seleccionado"}
            </div>
            {loadingName && (
              <div className="text-xs text-gray-500 mt-1">
                Obteniendo nombre...
              </div>
            )}
            {errorName && (
              <div className="text-xs text-red-500 mt-1">{errorName}</div>
            )}
          </div>
        </div>
      </div>

      {/* MapContainer */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={tileUrl}
          tileSize={256}
          zoomOffset={0}
          attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
        />
        <ClickHandler onMapClick={handleMapClick} />

        {origin && (
          <Marker
            position={[origin.latlng.lat, origin.latlng.lng]}
            icon={originIcon}
          />
        )}
        {destination && (
          <Marker
            position={[destination.latlng.lat, destination.latlng.lng]}
            icon={destinationIcon}
          />
        )}
      </MapContainer>
    </div>
  );
}
