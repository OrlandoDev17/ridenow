import { CheckCircleIcon } from "@/ui/Icons";
import { FileState, FileUploadConfig } from "@/lib/types";

interface FileUploadProps extends FileUploadConfig {
  file: FileState;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUpload({
  id,
  label,
  accept,
  file,
  error,
  onChange,
  icon: Icon,
  description,
}: FileUploadProps) {
  const hasFile = !!file;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-400">{label}</label>

      <div
        className={`mt-1 px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
          hasFile ? "border-green-500" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <div className="space-y-1 text-center">
          <div className="flex justify-center">
            {hasFile ? (
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            ) : (
              <Icon className="h-12 w-12 text-gray-400" />
            )}
          </div>

          <div className="mt-2">
            {hasFile ? (
              <>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Archivo cargado correctamente
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-400 hover:text-blue-500">
                  Sube {label.toLowerCase()}
                </span>{" "}
                o arrastra y suelta
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>

          <div className="mt-3">
            <input
              id={id}
              type="file"
              accept={accept}
              onChange={onChange}
              className="block mx-auto text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
