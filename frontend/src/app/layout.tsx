import { AuthProvider } from "@/context/AuthContext";
import { MessageProvider } from "@/context/MessageContext";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

const poppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "RideNow | Tu transporte de confianza en Charallave",
  description:
    "RideNow es la plataforma de transporte de confianza en Charallave.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${poppinsFont.variable} antialiased`}>
        <AuthProvider>
          <MessageProvider>
            <ClientLayout>{children}</ClientLayout>
          </MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
