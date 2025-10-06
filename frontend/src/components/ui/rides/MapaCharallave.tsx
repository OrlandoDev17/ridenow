import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

export function MapaCharallave() {
  const defaultCoords = {
    lat: 10.245604,
    lng: -66.85871,
  };

  const [puntoSeleccionado, setPuntoSeleccionado] = useState(defaultCoords);
  const [direccion, setDireccion] = useState("");

  const marcadorRojo = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const obtenerDireccion = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const nombre = data.display_name || "Ubicación seleccionada";
      setDireccion(nombre);
      console.log("📍 Dirección seleccionada:", nombre);
    } catch {
      setDireccion("Ubicación seleccionada");
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
        console.log("📍 Coordenadas seleccionadas:", coords);
        setPuntoSeleccionado(coords);
        obtenerDireccion(coords.lat, coords.lng);
      },
    });

    return null;
  }

  return (
    <MapContainer
      center={[defaultCoords.lat, defaultCoords.lng]}
      zoom={19}
      scrollWheelZoom={true}
      className="w-full h-[500px] rounded-lg z-0"
    >
      <TileLayer
        attribution="&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
      />
      <MapClickHandler />
      <Marker
        position={[puntoSeleccionado.lat, puntoSeleccionado.lng]}
        icon={marcadorRojo}
      />
    </MapContainer>
  );
}
