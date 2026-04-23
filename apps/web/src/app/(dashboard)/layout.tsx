"use client"

import { Sidebar } from "@repo/ui"
import { Home, ArrowRightLeft, FileText } from "lucide-react"
import "./layout.scss"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="layout">
            <Sidebar
                items={[
                    { label: "Início", icon: Home, href: "/dashboard" },
                    { label: "Transferências", icon: ArrowRightLeft, href: "/transferencias" },
                    { label: "Extrato", icon: FileText, href: "/extrato" },
                ]}
            />

            <main className="content">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    )
}