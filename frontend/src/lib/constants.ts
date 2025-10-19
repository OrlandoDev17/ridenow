// Tipos
import {
  ArrowRightIcon,
  CashIcon,
  CircleIcon,
  CreditCardIcon,
  LeftRightIcon,
  LocationIcon,
  PhoneIcon,
} from "@/components/ui/Icons";
import {
  AuthFormProps,
  NavbarItem,
  PaymentMethod,
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

export const NAVBAR_LINKS: NavbarItem[] = [
  {
    id: "viajes",
    label: "Viajes",
    href: "/",
  },
  {
    id: "historial",
    label: "Historial",
    href: "/history",
  },
  {
    id: "cuenta",
    label: "Cuenta",
    href: "/account",
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
