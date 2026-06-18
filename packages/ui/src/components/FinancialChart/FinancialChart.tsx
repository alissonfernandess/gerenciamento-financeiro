"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import "./FinancialChart.scss"

export type FinancialChartData = {
  month: string
  receitas: number
  despesas: number
}

export type FinancialChartProps = {
  data?: FinancialChartData[]
}

const defaultData: FinancialChartData[] = [
  { month: "Jan", receitas: 5200, despesas: 3100 },
  { month: "Fev", receitas: 4800, despesas: 2800 },
  { month: "Mar", receitas: 6100, despesas: 3600 },
  { month: "Abr", receitas: 5900, despesas: 4200 },
  { month: "Mai", receitas: 7200, despesas: 3900 },
  { month: "Jun", receitas: 6800, despesas: 4500 },
]

export const FinancialChart = ({ data = defaultData }: FinancialChartProps) => {
  return (
    <div className="financial-chart">
      <div className="financial-chart__header">
        <h2>Receitas x Despesas</h2>
        <p>Comparativo dos últimos meses</p>
      </div>

      <div className="financial-chart__content">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="receitas" name="Receitas" radius={[8, 8, 0, 0]} fill="#FFFFFF" />
            <Bar dataKey="despesas" name="Despesas" radius={[8, 8, 0, 0]} fill="#FD4E4E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
