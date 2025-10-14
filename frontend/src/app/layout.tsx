"use client";

import { AuthProvider } from "@/context/AuthContext";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { usePathname } from "next/navigation";

const poppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const showHeader =
    pathname !== "/auth/login" && pathname !== "/auth/register";

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="RideNow es la plataforma de transporte de confianza en Charallave."
        />
        <title>RideNow | Tu transporte de confianza en Charallave</title>
      </head>
      <body className={`${poppinsFont.variable} antialiased`}>
        <AuthProvider>
          {showHeader && <Header />}
          <div>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
