"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/ui/Button";
import { LogOutIcon } from "@/ui/Icons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { isAuthenticated, logout, logoutSuccess, setLogoutSuccess } =
    useAuth();

  const router = useRouter();

  useEffect(() => {
    if (logoutSuccess) {
      router.push("/auth/login");
      setLogoutSuccess(false);
    }
  }, [logoutSuccess]);

  return (
    <header className="fixed top-0 w-full bg-primary/70 backdrop-blur-lg border-b border-gray-500 z-50">
      <div className="flex items-center justify-between max-w-9/12 mx-auto w-full h-20">
        <div>
          <h2 className="text-blue-400 text-3xl font-bold">RideNow</h2>
        </div>
        <aside className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                onClick={logout}
              >
                <LogOutIcon />
                Cerrar Sesión
              </button>
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
