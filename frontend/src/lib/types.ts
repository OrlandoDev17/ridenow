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
