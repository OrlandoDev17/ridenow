import { ButtonProps } from "@/lib/types";

export function Button({
  href,
  children,
  type = "default",
  target = false,
}: ButtonProps) {
  return (
    <a
      className={`flex items-center gap-3 px-5 py-2.5 rounded-lg font-medium cursor-pointer transition-colors 
    ${type === "default" && "bg-blue-500 hover:bg-blue-600"}
    ${
      type === "outline" &&
      "bg-primary border border-neutral-800 hover:bg-neutral-800"
    }`}
      href={href}
      target={target ? "_blank" : "_self"}
      rel={target ? "noopener noreferrer" : ""}
    >
      {children}
    </a>
  );
}
