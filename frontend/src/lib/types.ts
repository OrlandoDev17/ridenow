import { ComponentType } from "react";

export interface IconProps {
  className?: string;
}

export interface ElectionCardProps {
  id?: string;
  title: string;
  icon: ComponentType<IconProps>;
  text: string;
}

export interface AuthFormProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: keyof FormValues;
}

export interface LoginProps {
  cedula: string;
  password: string;
}

export interface User {
  cedula: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  role: "CLIENT";
}

export interface Driver {
  cedula: string;
  name: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  role: "DRIVER";
}

export interface APIError {
  message?: string;
  error?: string;
}

export interface RegisterProps {
  cedula: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

export interface RegisterFormProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: string;
}

// Nuevos tipos para componentes de registro
export type FileState = File | null;

export interface FileUploadConfig {
  id: string;
  label: string;
  accept: string;
  description: string;
  icon: ComponentType<IconProps>;
}

export interface ClientStepProps {
  files: {
    photo: FileState;
    idDocument: FileState;
  };
  errors: {
    photo?: string;
    idDocument?: string;
  };
  onFileChange: (
    type: "photo" | "idDocument"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface DriverStepProps {
  formData: {
    brand: string;
    model: string;
    licensePhoto: FileState;
    vehiclePhoto: FileState;
  };
  errors: {
    brand?: string;
    model?: string;
    licensePhoto?: string;
    vehiclePhoto?: string;
  };
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (
    type: "licensePhoto" | "vehiclePhoto"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface FormValues {
  cedula: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}
