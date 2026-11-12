"use client"

import Link from "next/link"
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
    const { user, isAuthenticated, pathname, logout } = useDashboardLayout()

    if (!isAuthenticated) return null

    return (
        <div className="layout">
            {/*
              MUDANÇAS:
              - linkComponent={Link}: o menu passa a usar o <Link> do Next em vez de <a href>.
                Com <a>, cada clique recarregava a página inteira (perdendo o estado e as
                transferências feitas). Com <Link>, a navegação é instantânea, só troca o
                conteúdo, e o Next PRÉ-CARREGA em segundo plano as rotas dos links que
                aparecem na tela (pré-carregamento/prefetch).
              - onLogout: botão "Sair" que encerra a sessão no servidor.
            */}
            <Sidebar
                userName={user?.nome ?? ''}
                activePath={pathname}
                linkComponent={Link}
                onLogout={logout}
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
