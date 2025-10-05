"use client";

import { CameraIcon, DocumentIcon } from "../Icons";
import { FileUpload } from "./FileUpload";
import { useRegisterContext } from "@/context/RegisterContext";

const FILE_UPLOADS = {
  licensePhoto: {
    id: "license-upload",
    label: "Foto de tu licencia de conducir",
    accept: "image/*",
    description: "PNG, JPG hasta 10MB",
    icon: DocumentIcon,
  },
  vehiclePhoto: {
    id: "vehicle-upload",
    label: "Foto de tu vehículo",
    accept: "image/*",
    description: "PNG, JPG hasta 10MB",
    icon: CameraIcon,
  },
};

export function DriverStep() {
  const { driverFiles, setDriverFiles, submit, loading, error, success } =
    useRegisterContext();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverFiles((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange =
    (type: "licensePhoto" | "vehiclePhoto") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setDriverFiles((prev) => ({ ...prev, [type]: file }));
    };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-6 w-full"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Marca del vehículo *
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={driverFiles.brand}
            onChange={handleTextChange}
            placeholder="Ej: Mitsubishi"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-neutral-800 text-white p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Modelo del vehículo *
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={driverFiles.model}
            onChange={handleTextChange}
            placeholder="Ej: Lancer"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-neutral-800 text-white p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {Object.entries(FILE_UPLOADS).map(([key, config]) => (
          <FileUpload
            key={config.id}
            {...config}
            file={driverFiles[key as "licensePhoto" | "vehiclePhoto"]}
            onChange={handleFileChange(key as "licensePhoto" | "vehiclePhoto")}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm text-center">Registro exitoso</p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registrando..." : "Registrarse como conductor"}
        </button>
      </div>
    </form>
  );
}
