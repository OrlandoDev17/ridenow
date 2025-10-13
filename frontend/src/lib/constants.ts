// Tipos
import {
  ArrowRightIcon,
  CircleIcon,
  LeftRightIcon,
  LocationIcon,
} from "@/components/ui/Icons";
import {
  AuthFormProps,
  NavbarItem,
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
    id: "one-way",
    label: "Solo Ida",
    icon: ArrowRightIcon,
  },
  {
    id: "round-trip",
    label: "Ida y Vuelta",
    icon: LeftRightIcon,
  },
];
