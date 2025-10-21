import { ComponentType } from "react";
import type { ReactNode } from "react";
import type L from "leaflet";

/** Propiedades para componentes de íconos */
export interface IconProps {
  className?: string;
}

/** Elemento de navegación para la barra de navegación */
export interface NavbarItem {
  id: string;
  label: string;
  href: string;
}

/** Propiedades para campos de formulario de autenticación */
export interface AuthFormProps {
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: keyof FormValues;
}

/** Datos de inicio de sesión */
export interface LoginProps {
  cedula: string;
  password: string;
}

/**
 * Representa un usuario en el sistema.
 * @property {string} role - Rol del usuario, siempre "CLIENT" para este tipo
 */
export interface User {
  cedula: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  role: "CLIENT";
}

/**
 * Representa un conductor en el sistema.
 */
export interface Driver {
  cedula: string;
  name: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  role: "DRIVER";
}

/** Formato estándar para errores de la API */
export interface APIError {
  message?: string;
  error?: string;
}

/** Datos de registro de usuario */
export interface RegisterProps {
  cedula: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

/** Configuración de campos para formularios de registro */
export interface RegisterFormProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: string;
}

/** Estructura de valores para formularios */
export interface FormValues {
  cedula: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
}

/** Elemento de formulario para la sección de viajes */
export interface TravelFormItem {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  icon: ComponentType<IconProps>;
}

/** Opciones de viaje disponibles */
export interface TravelOptions {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  value: string;
}

/** Método de pago disponible */
export interface PaymentMethod {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  value: string;
}

// Uniones de dominio y tipos primitivos compartidos

/** Roles de usuario en la aplicación */
export type Role = "CLIENT" | "DRIVER";

/** Códigos de métodos de pago aceptados */
export type PaymentMethodCode = "CASH" | "PAGO_MOVIL" | "CREDITS";

/** Tipos de viaje disponibles */
export type TravelOptionCode = "ONE_WAY" | "ROUND_TRIP";

// Tipos compartidos relacionados con mapas
export interface MapLocation {
  latlng: L.LatLng;
  name: string;
}

// Travel map props (centralized from components/ui/rides/TravelMap.tsx)
/**
 * Propiedades para el componente de mapa de viajes.
 * @property {L.LatLngTuple} [center] - Coordenadas del centro del mapa
 * @property {number} [zoom] - Nivel de zoom inicial
 * @property {string} [width] - Ancho del contenedor del mapa
 */
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

/** Propiedades para el componente de viaje (barra lateral) */
export interface TravelProps {
  origin: MapLocation | null;
  destination: MapLocation | null;
}

// Hook request payload for creating rides
/**
 * Datos necesarios para solicitar un viaje.
 */
export interface UseRidesRequest {
  origin: MapLocation | null;
  destination: MapLocation | null;
  userCedula: string | null;
  scheduled: boolean;
  paymentMethod: PaymentMethodCode;
  travelOption: TravelOptionCode;
}

/** Propiedades para componentes de botón */
export interface ButtonProps {
  href: string;
  children: ReactNode;
  type?: "default" | "outline";
  target?: boolean;
}

// Auth context shape to be reused across app
/** Tipo unión para usuarios de la aplicación (cliente o conductor) */
export type AppUser = User | Driver | null;

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
  setFormValues: (values: FormValues | ((prevValues: FormValues) => FormValues)) => void;
  setRole: (role: Role | string) => void;
  login: (cedula: string, password: string) => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
}
