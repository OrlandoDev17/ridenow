import { NAVBAR_LINKS } from "@/lib/constants";
import { LogOutIcon, XIcon } from "../ui/Icons";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/Button";

export function MenuContent({ onClose }: { onClose: () => void }) {
  const { user, isAuthenticated, logout } = useAuth();

  const userFirstLetter = user?.name.split(" ")[0].charAt(0);

  return (
    <>
      <div className="flex flex-col gap-6 h-full">
        <header className="flex items-center justify-between gap-2 w-full">
          <h2 className="flex items-center gap-2 text-3xl font-extrabold">
            Ride<span className="text-blue-500">Now</span>
          </h2>
          <button onClick={onClose}>
            <XIcon className="size-11 p-2 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer" />
          </button>
        </header>
        <nav className="flex flex-col gap-4 flex-grow basis-0 h-full">
          {NAVBAR_LINKS.map(({ id, label, href }) => (
            <Link
              className="text-lg font-semibold px-4 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition"
              href={href}
              key={id}
            >
              {label}
            </Link>
          ))}
        </nav>
        <footer className="flex justify-between items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <button
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                onClick={logout}
              >
                <LogOutIcon />
                Cerrar Sesión
              </button>
              <Link
                href="/profile"
                className="flex items-center justify-center text-2xl font-semibold text-blue-500 size-12 bg-blue-500/10 rounded-full"
              >
                {userFirstLetter}
              </Link>
            </>
          ) : (
            <>
              <Button type="outline" href="/auth/login">
                Iniciar Sesión
              </Button>
              <Button href="/auth/register">Registrarse</Button>
            </>
          )}
        </footer>
      </div>
    </>
  );
}
