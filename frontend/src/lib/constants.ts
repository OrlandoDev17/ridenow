// Tipos
import {
  ArrowRightIcon,
  CalendarIcon,
  CarIcon,
  CashIcon,
  CircleIcon,
  CreditCardIcon,
  HomeIcon,
  IdCardIcon,
  LeftRightIcon,
  LocationIcon,
  MailIcon,
  MapIcon,
  PhoneIcon,
  SettingsIcon,
  UserIcon,
} from "@/components/ui/Icons";
import {
  AuthFormProps,
  NavItem,
  PaymentMethod,
  ProfileFormProps,
  TravelFormItem,
  TravelOptions,
} from "./types";

export const LOGIN_FORM: AuthFormProps[] = [
  {
    id: "cedula",
    type: "text",
    placeholder: "Cedula de Identidad",
    required: true,
    name: "cedula",
  },
  {
    id: "password",
    type: "password",
    placeholder: "********",
    required: true,
    name: "password",
  },
];

export const REGISTER_FORM: AuthFormProps[] = [
  {
    id: "name",
    type: "text",
    placeholder: "Nombre Completo",
    required: true,
    name: "name",
  },
  {
    id: "cedula",
    type: "text",
    placeholder: "Cedula de Identidad",
    required: true,
    name: "cedula",
  },
  {
    id: "phone",
    type: "number",
    placeholder: "Numero de Telefono",
    required: true,
    name: "phone",
  },

  {
    id: "password",
    type: "password",
    placeholder: "********",
    required: true,
    name: "password",
  },
];

export const NAVBAR_LINKS: NavItem[] = [
  {
    id: "viajes",
    label: "Viajes",
    href: "/clientRides",
    icon: CarIcon,
  },
  {
    id: "historial",
    label: "Historial",
    href: "/history",
    icon: CalendarIcon,
  },
  {
    id: "cuenta",
    label: "Cuenta",
    href: "/account",
    icon: UserIcon,
  },
];

export const TRAVEL_FORM: TravelFormItem[] = [
  {
    id: "origin",
    label: "Origen",
    name: "origin",
    placeholder: "¿Donde estas?",
    icon: CircleIcon,
  },
  {
    id: "destination",
    label: "Destino",
    name: "destination",
    placeholder: "¿A donde quieres ir?",
    icon: LocationIcon,
  },
];

export const TRAVEL_OPTIONS: TravelOptions[] = [
  {
    id: "ONE_WAY",
    label: "Solo Ida",
    icon: ArrowRightIcon,
    value: "ONE_WAY",
  },
  {
    id: "ROUND_TRIP",
    label: "Ida y Vuelta",
    icon: LeftRightIcon,
    value: "ROUND_TRIP",
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "CASH",
    label: "Efectivo",
    icon: CashIcon,
    value: "CASH",
  },
  {
    id: "PAGO_MOVIL",
    label: "Pago Movil",
    icon: PhoneIcon,
    value: "PAGO_MOVIL",
  },
  {
    id: "CREDITS",
    label: "Creditos",
    icon: CreditCardIcon,
    value: "CREDITS",
  },
];

export const SIDEBAR_LINKS: NavItem[] = [
  {
    id: "home",
    label: "Inicio",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: "profile",
    label: "Mi Perfil",
    href: "/profile",
    icon: UserIcon,
  },
  {
    id: "rides",
    label: "Mis Viajes",
    href: "/profile/rides",
    icon: MapIcon,
  },
  {
    id: "settings",
    label: "Configuración",
    href: "/profile/settings",
    icon: SettingsIcon,
  },
];

export const PROFILE_FORM: ProfileFormProps[] = [
  {
    id: "name",
    label: "Nombre Completo",
    name: "name",
    icon: UserIcon,
  },
  {
    id: "cedula",
    label: "Cedula de Identidad",
    name: "cedula",
    icon: IdCardIcon,
  },
  {
    id: "phone",
    label: "Número de Teléfono",
    name: "phone",
    icon: PhoneIcon,
  },
  {
    id: "address",
    label: "Dirección",
    name: "address",
    placeholder: "Calle 123, Urb. 123",
    icon: LocationIcon,
  },
  {
    id: "email",
    label: "Correo Electrónico",
    name: "email",
    placeholder: "email@example.com",
    icon: MailIcon,
  },
];

export const MOBILE_NAV: NavItem[] = [
  {
    id: "home",
    label: "Inicio",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: "travels",
    label: "Viajes",
    href: "/clientRides",
    icon: CarIcon,
  },
  {
    id: "history",
    label: "Historial",
    href: "/history",
    icon: CalendarIcon,
  },
  {
    id: "profile",
    label: "Perfil",
    href: "/profile",
    icon: UserIcon,
  },
];
