"use client";

//Hooks
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//Context
import { useAuth } from "@/context/AuthContext";

//Components
import { Button } from "@/ui/Button";
import Link from "next/link";

//Icons
import { LogOutIcon } from "@/ui/Icons";

//Constants
import { NAVBAR_LINKS } from "@/lib/constants";

export function Header() {
  const {
    isAuthenticated,
    logout,
    logoutSuccess,
    setLogoutSuccess,
    user,
    isHydrated,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (logoutSuccess) {
      router.push("/auth/login");
      setLogoutSuccess(false);
    }
  }, [logoutSuccess]);

  if (!isHydrated) {
    return null;
  }

  const userFirstLetter = user?.name.split(" ")[0].charAt(0);

  return (
    <header className="w-full bg-primary border-b-1 border-gray-800 z-50">
      <div className="flex items-center justify-between max-w-11/12 mx-auto w-full h-20">
        <div>
          <h2 className="text-4xl font-extrabold">
            Ride<span className="text-blue-500">Now</span>
          </h2>
        </div>
        <nav className="flex items-center gap-6 flex-1 justify-center mt-1">
          {NAVBAR_LINKS.map((link) => (
            <Link
              className="flex flex-col text-lg relative hover:text-blue-400 transition group"
              key={link.id}
              href={link.href}
            >
              {link.label}
              <span className="w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
        <aside className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <button
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                onClick={logout}
              >
                <LogOutIcon />
                Cerrar Sesión
              </button>
              <span className="flex items-center justify-center text-2xl font-semibold text-blue-500 size-12 bg-blue-500/10 rounded-full">
                {userFirstLetter}
              </span>
            </>
          ) : (
            <>
              <Button type="outline" href="/auth/login">
                Iniciar Sesión
              </Button>
              <Button href="/auth/register">Registrarse</Button>
            </>
          )}
        </aside>
      </div>
    </header>
  );
}
