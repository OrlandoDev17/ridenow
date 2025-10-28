"use client";

import Link from "next/link";

export default function HomePage() {
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
