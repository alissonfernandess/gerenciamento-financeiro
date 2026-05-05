"use client"

import { Sidebar } from "@repo/ui"
import "./layout.scss"
import { FaHome } from "react-icons/fa"
import { GrTransaction } from "react-icons/gr";
import { RiFileList2Fill } from "react-icons/ri";
import { useDashboardLayout } from "./hooks/useDashboardLayout"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, isAuthenticated, pathname } = useDashboardLayout()

    if (!isAuthenticated) return null

    return (
        <div className="layout">
            <Sidebar
                userName={user?.nome ?? ''}
                activePath={pathname}
                items={[
                    { label: "Início", icon: FaHome, href: "/dashboard" },
                    { label: "Transferências", icon: GrTransaction, href: "/transferencias" },
                    { label: "Extrato", icon: RiFileList2Fill, href: "/extrato" },
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