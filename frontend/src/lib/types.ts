import { ComponentType } from "react";

export interface IconProps {
  className?: string;
}

export interface NavbarItem {
  id: string;
  label: string;
  href: string;
}

export interface AuthFormProps {
  id: string;
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

export interface FormValues {
  cedula: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

export interface TravelFormItem {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  icon: ComponentType<IconProps>;
}

export interface TravelOptions {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
}
