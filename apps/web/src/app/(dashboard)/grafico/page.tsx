"use client"

import { DashboardMetric, FinancialChart, GoalCard } from "@repo/ui"
import "./page.scss"

export default function GraficoPage() {
  return (
    <div className="grafico-page">
      <h1>Gráfico</h1>

      <div className="metrics-section">
        <DashboardMetric title="Saldo Total" value={83064344} variation={8.5} type="positive" />
        <DashboardMetric title="Receitas" value={5200} variation={12.3} type="positive" />
        <DashboardMetric title="Despesas" value={1400} variation={-4.5} type="negative" />
      </div>

      <div className="content-grid">
        <FinancialChart />

        <div className="goals-section">
          <h2>Metas Financeiras</h2>

          <GoalCard title="Viagem" current={7000} target={10000} />
          <GoalCard title="Reserva de Emergência" current={4000} target={10000} />
          <GoalCard title="Comprar um Carro" current={5000} target={50000} />
        </div>
      </div>
    </div>
  )
}