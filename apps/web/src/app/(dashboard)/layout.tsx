"use client"

import { Sidebar } from "@repo/ui"
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
                    { label: "Início", icon: '', href: "/dashboard" },
                    { label: "Transferências", icon: '', href: "/transferencias" },
                    { label: "Extrato", icon: '', href: "/extrato" },
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