import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@repo/hooks";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dashboard | Gerenciamento Financeiro",
  description: "Indicadores e resumos financeiros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" style={{ height: "100%" }}>
      <body
        className={`${inter.variable} font-sans`}
        style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
      >
        <UserProvider mode="zone">{children}</UserProvider>
      </body>
    </html>
  );
}
