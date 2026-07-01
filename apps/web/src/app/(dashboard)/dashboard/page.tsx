"use client"

import { useState } from "react"
import { DashboardMetric, ProfileOverview, FinancialChart, CustomButton } from "@repo/ui"
import "./page.scss"
import { useDashboard } from "./hooks/useDashboard"
import { useGoals } from "./hooks/useGoals"
import { EditableGoalCard } from "./components/EditableGoalCard"

export default function DashboardPage() {
  const { user } = useDashboard()
  const { goals, addGoal, updateGoal, removeGoal } = useGoals()
  const [isEditingGoals, setIsEditingGoals] = useState(false)

  function handleAddGoal() {
    addGoal({ title: "Nova meta", current: 0, target: 1000 })
  }

  return (
    <div className="dashboard-page">
      <div className="profile-section">
        <ProfileOverview
          name={user?.nome ?? ""}
          amount={user?.saldo ?? 0}
        />
      </div>

      <div className="content-grid">
        <div className="overview-column">
          <div className="metrics-section">
            <DashboardMetric title="Saldo Total" value={2000} variation={8.5} type="positive" />
            <DashboardMetric title="Despesas" value={1400} variation={4.5} type="negative" />
          </div>

          <FinancialChart />
        </div>

        <div className="goals-section">
          <div className="goals-section__header">
            <h2>Metas Financeiras</h2>
            <CustomButton
              type="button"
              text={isEditingGoals ? "Concluir" : "Editar"}
              eventClick={() => setIsEditingGoals((prev) => !prev)}
            />
          </div>

          {goals.map((goal) => (
            <EditableGoalCard
              key={goal.id}
              goal={goal}
              isEditing={isEditingGoals}
              onUpdate={updateGoal}
              onRemove={removeGoal}
            />
          ))}

          {isEditingGoals && (
            <CustomButton
              type="button"
              text="+ Nova meta"
              className="goals-section__add-btn"
              eventClick={handleAddGoal}
            />
          )}
        </div>
      </div>
    </div>
  )
}