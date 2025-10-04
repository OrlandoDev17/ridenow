// Tipos
import { ElectionCardProps } from "./types";
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
