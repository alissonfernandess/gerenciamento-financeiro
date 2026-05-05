import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { UserProvider } from "@/contexts/UserContext"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Gerenciamento Financeiro',
  description: 'Gerenciamento Financeiro - Seu Portal de Notícias',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className={`${inter.variable} font-sans`} style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}