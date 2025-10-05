import { FileUpload } from "./FileUpload";
import { CameraIcon, DocumentIcon } from "../Icons";
import { useRegisterContext } from "@/context/RegisterContext";

const FILE_UPLOADS = {
  photo: {
    id: "photo-upload",
    label: "Foto de perfil",
    accept: "image/*",
    description: "PNG, JPG, GIF hasta 10MB",
    icon: CameraIcon,
  },
  idDocument: {
    id: "id-upload",
    label: "Documento de identidad",
    accept: "image/*,.pdf",
    description: "PDF, PNG, JPG hasta 10MB",
    icon: DocumentIcon,
  },
};

export function ClientStep() {
  const { clientFiles, setClientFiles, submit, loading, error, success } =
    useRegisterContext();

  const handleChange =
    (type: "photo" | "idDocument") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setClientFiles((prev) => ({ ...prev, [type]: file }));
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
        {Object.entries(FILE_UPLOADS).map(([key, config]) => (
          <FileUpload
            key={config.id}
            {...config}
            file={clientFiles[key as "photo" | "idDocument"]}
            onChange={handleChange(key as "photo" | "idDocument")}
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
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm transition-colors duration-200"
        >
          {loading ? "Registrando..." : "Registrarse como cliente"}
        </button>
      </div>
    </form>
  );
}
