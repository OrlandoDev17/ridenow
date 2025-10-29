"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { token, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      if (role === "CLIENT") {
        router.push("/clientRides");
      }
      if (role === "DRIVER") {
        router.push("/driverRides");
      }
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <Link className="px-4 py-2 bg-blue-500 text-white" href="/auth/login">
        Login
      </Link>
      <Link className="px-4 py-2 bg-blue-500 text-white" href="/auth/register">
        Register
      </Link>
    </div>
  );
}
