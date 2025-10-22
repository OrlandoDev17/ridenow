import { SIDEBAR_LINKS } from "@/lib/constants";
import { User } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon } from "../Icons";

export function Sidebar({ photoUrl, name, cedula }: User) {
  const pathname = usePathname();
  const userFirstLetter = name.charAt(0).toUpperCase();

  return (
    <aside className="flex flex-col gap-6 w-sm border-r-2 border-gray-700 p-4 h-screen">
      <header className="flex items-center gap-4">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Foto de perfil"
            className="size-18 rounded-full"
          />
        ) : (
          <span className="flex items-center justify-center text-3xl font-semibold text-blue-500 size-14 bg-blue-500/10 rounded-full">
            {userFirstLetter}
          </span>
        )}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{name}</h3>
          <h4 className="text-gray-500">V-{cedula}</h4>
        </div>
      </header>
      <nav className="flex flex-col gap-4 mt-6 flex-1">
        {SIDEBAR_LINKS.map(({ id, label, href, icon: Icon }) => (
          <Link
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors duration-300  ${
              pathname === href ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            key={id}
            href={href}
          >
            <Icon className="size-7" />
            <span className="text-xl font-semibold">{label}</span>
          </Link>
        ))}
      </nav>
      <footer className="flex items-center gap-4 w-full">
        <button className="flex w-full items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-colors duration-300 hover:bg-red-500 cursor-pointer">
          <LogOutIcon className="size-7" />
          <span className="text-xl font-semibold">Cerrar sesión</span>
        </button>
      </footer>
    </aside>
  );
}
