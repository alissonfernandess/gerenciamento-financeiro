import type { Metadata } from "next"
import "./globals.scss"
import { UserProvider } from "@/contexts/UserContext"

export const metadata: Metadata = {
    title: "Gerenciamento Financeiro",
    description: "Aplicação de gerenciamento financeiro",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body>
                <UserProvider>
                    {children}
                </UserProvider>
            </body>
        </html>
    )
}