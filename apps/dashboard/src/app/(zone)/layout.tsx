"use client";

import { Sidebar } from "@repo/ui";
import { useZoneLayout } from "@repo/hooks";
import { FaChartLine, FaHome } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
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
            label: "Analytics",
            icon: FaChartLine,
            href: "/dashboard/analytics",
          },
          {
            label: "Transações",
            icon: GrTransaction,
            href: "/transactions/transactions",
          },
        ]}
      />

      <main className="content">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
