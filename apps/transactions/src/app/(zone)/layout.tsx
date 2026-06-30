"use client";

import { Sidebar } from "@repo/ui";
import { useZoneLayout } from "@repo/hooks";
import { FaHome } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { RiFileList2Fill } from "react-icons/ri";
import "./layout.scss";

export default function ZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, pathname } = useZoneLayout();

  if (!isAuthenticated) return null;

  return (
    <div className="layout">
      <Sidebar
        userName={user?.nome ?? ""}
        activePath={pathname}
        items={[
          { label: "Início", icon: FaHome, href: "/dashboard/dashboard" },
          {
            label: "Transações",
            icon: GrTransaction,
            href: "/transactions/transactions",
          },
          {
            label: "Nova transação",
            icon: RiFileList2Fill,
            href: "/transactions/transactions/create",
          },
        ]}
      />

      <main className="content">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
