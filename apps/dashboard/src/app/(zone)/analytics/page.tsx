"use client";

import { useDashboard } from "@repo/hooks";
import { formatCurrency } from "@repo/utils";

export default function AnalyticsPage() {
  const { user } = useDashboard();

  const receitas =
    user?.transacoes
      .filter((t) => t.operationBank === "deposit")
      .reduce((sum, t) => sum + t.value, 0) ?? 0;

  const despesas =
    user?.transacoes
      .filter((t) => t.operationBank === "withdrawal")
      .reduce((sum, t) => sum + t.value, 0) ?? 0;

  const economia = receitas - despesas;

  const indicators = [
    { label: "Saldo Atual", value: user?.saldo ?? 0 },
    { label: "Receitas", value: receitas },
    { label: "Despesas", value: despesas },
    { label: "Economia", value: economia },
  ];

  return (
    <div style={{ padding: "32px 0", display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ color: "#fff", fontSize: "24px", margin: 0 }}>Analytics</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {indicators.map((item) => (
          <div
            key={item.label}
            style={{
              background: "#0b1424",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: "14px" }}>{item.label}</span>
            <span style={{ color: "#fff", fontSize: "20px", fontWeight: 600 }}>
              R$ {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
