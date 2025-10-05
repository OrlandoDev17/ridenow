// Tipos
import { AuthFormProps, ElectionCardProps } from "./types";
// Iconos
import { LocationIcon, CarIcon } from "@/components/ui/Icons";

export const ELECTION_CARDS: ElectionCardProps[] = [
  {
    id: "client",
    title: "Cliente",
    icon: LocationIcon,
    text: "Solicita viajes seguros y confiables",
  },
  {
    id: "driver",
    title: "Conductor",
    icon: CarIcon,
    text: "Unete a nuestro equipo de conductores",
  },
];

export const LOGIN_FORM: AuthFormProps[] = [
  {
    id: "cedula",
    label: "Cedula de Identidad",
    type: "text",
    placeholder: "12345678",
    required: true,
    name: "cedula",
  },
  {
    id: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "********",
    required: true,
    name: "password",
  },
];

export const REGISTER_FORM: AuthFormProps[] = [
  {
    id: "name",
    label: "Nombre completo",
    type: "text",
    placeholder: "Orlando López",
    required: true,
    name: "name",
  },
  {
    id: "cedula",
    label: "Cedula de Identidad",
    type: "text",
    placeholder: "12345678",
    required: true,
    name: "cedula",
  },
  {
    id: "phone",
    label: "Telefono",
    type: "number",
    placeholder: "0412345678",
    required: true,
    name: "phone",
  },

  {
    id: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "********",
    required: true,
    name: "password",
  },
];
