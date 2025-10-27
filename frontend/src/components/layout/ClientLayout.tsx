"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/ui/MobileNav";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showHeader =
    pathname !== "/auth/login" &&
    pathname !== "/auth/register" &&
    pathname !== "/profile";

  const showMobileNav =
    pathname !== "/auth/login" && pathname !== "/auth/register";

  const bottomPadding = showMobileNav ? "lg:pb-0 pb-20" : "";

  return (
    <>
      {showHeader && <Header />}
      <div className={bottomPadding}>
        {children}
        {showMobileNav && <MobileNav />}
      </div>
    </>
  );
}
