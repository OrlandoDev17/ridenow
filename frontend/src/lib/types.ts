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
  name: string;
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
