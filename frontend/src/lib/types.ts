import { ComponentType } from "react";
import type { ReactNode } from "react";
import type L from "leaflet";

// ==============================================
// Tipos básicos y utilidades
// ==============================================

/** Propiedades para componentes de íconos */
export interface IconProps {
  className?: string;
}

/** Propiedades para componentes de botón */
export interface ButtonProps {
  href: string;
  children: ReactNode;
  type?: "default" | "outline";
  target?: boolean;
}

// ==============================================
// Navegación y UI
// ==============================================

/** Elemento de navegación para la barra de navegación */
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
}

// ==============================================
// Autenticación y Usuarios
// ==============================================

/** Datos de inicio de sesión */
export interface LoginProps {
  cedula: string;
  password: string;
}

/** Representa un usuario en el sistema */
export interface User {
  cedula: string;
  name: string;
  phone?: string;
  role?: Role;
  email?: string;
  address?: string;
  photoUrl?: string;
  createdAt?: string;
}

/** Roles de usuario en la aplicación */
export type Role = "CLIENT" | "DRIVER" | "ADMIN";

/** Formato estándar para errores de la API */
export interface APIError {
  message?: string;
  error?: string;
}

// ==============================================
// Formularios
// ==============================================

/** Estructura de valores para formularios */
export interface FormValues {
  cedula: string;
  name: string;
  phone: string;
  password: string;
}

/** Propiedades para campos de formulario de autenticación */
export interface AuthFormProps {
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: keyof FormValues;
}

// ==============================================
// Viajes y Ubicaciones
// ==============================================

/** Ubicación en el mapa */
export interface MapLocation {
  latlng: L.LatLng;
  name: string;
}

/** Propiedades para el componente de mapa de viajes */
export interface MapProps {
  center?: L.LatLngTuple;
  zoom?: number;
  width?: string;
  height?: string;
  setOrigin: (origin: MapLocation | null) => void;
  setDestination: (destination: MapLocation | null) => void;
  origin: MapLocation | null;
  destination: MapLocation | null;
}

/** Opciones de viaje disponibles */
export interface TravelOptions {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  value: string;
}

/** Elemento de formulario para la sección de viajes */
export interface TravelFormItem {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  icon: ComponentType<IconProps>;
}

/** Tipos de viaje disponibles */
export type TravelOptionCode = "ONE_WAY" | "ROUND_TRIP";

/** Códigos de métodos de pago aceptados */
export type PaymentMethodCode = "CASH" | "PAGO_MOVIL" | "CREDITS";

/** Método de pago disponible */
export interface PaymentMethod {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  value: string;
}

/** Datos necesarios para solicitar un viaje */
export interface UseRidesRequest {
  origin: MapLocation | null;
  destination: MapLocation | null;
  userCedula: string | null;
  scheduled: boolean;
  paymentMethod: PaymentMethodCode;
  travelOption: TravelOptionCode;
}

// ==============================================
// Contexto de Autenticación
// ==============================================

/** Tipo para el usuario de la aplicación */
export type AppUser = User | null;

/** Formato del contexto de autenticación */
export interface AuthContextType {
  token: string | null;
  user: AppUser;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  formValues: FormValues;
  role: Role | string;
  logoutSuccess: boolean;
  setLogoutSuccess: (success: boolean) => void;
  setFormValues: (
    values: FormValues | ((prevValues: FormValues) => FormValues)
  ) => void;
  setRole: (role: Role | string) => void;
  login: (cedula: string, password: string) => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
}

// ==============================================
// Componentes
// ==============================================

/** Propiedades para el componente de viaje (barra lateral) */
export interface TravelProps {
  origin: MapLocation | null;
  destination: MapLocation | null;
}

/** Propiedades de el formulario del perfil */
export interface ProfileFormProps {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  value?: User;
  icon: ComponentType<IconProps>;
}
