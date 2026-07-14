"use client"

import { useState } from "react"
import { GoalCard, CustomButton } from "@repo/ui"
import type { FinancialGoal } from "../../hooks/useGoals"
import "./EditableGoalCard.scss"

type Props = {
  goal: FinancialGoal
  isEditing: boolean
  onUpdate: (id: string, data: Partial<Omit<FinancialGoal, "id">>) => void
  onRemove: (id: string) => void
}

export function EditableGoalCard({ goal, isEditing, onUpdate, onRemove }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [title, setTitle] = useState(goal.title)
  const [current, setCurrent] = useState(String(goal.current))
  const [target, setTarget] = useState(String(goal.target))

  function handleSave() {
    onUpdate(goal.id, {
      title,
      current: Number(current) || 0,
      target: Number(target) || 0,
    })
    setIsFormOpen(false)
  }

  function handleCancel() {
    setTitle(goal.title)
    setCurrent(String(goal.current))
    setTarget(String(goal.target))
    setIsFormOpen(false)
  }

  if (isFormOpen) {
    return (
      <div className="editable-goal-form">
        <input
          className="editable-goal-form__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome da meta"
        />
        <div className="editable-goal-form__row">
          <input
            className="editable-goal-form__input"
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Valor atual"
          />
          <input
            className="editable-goal-form__input"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Valor objetivo"
          />
        </div>
        <div className="editable-goal-form__actions">
          <CustomButton
            type="button"
            text="Salvar"
            hasBackgroundColor
            eventClick={handleSave}
          />
          <CustomButton
            type="button"
            text="Cancelar"
            eventClick={handleCancel}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="editable-goal-card">
      <GoalCard title={goal.title} current={goal.current} target={goal.target} />

      {isEditing && (
        <div className="editable-goal-card__actions">
          <CustomButton
            type="button"
            text="Editar"
            eventClick={() => setIsFormOpen(true)}
          />
          <CustomButton
            type="button"
            text="Remover"
            className="editable-goal-card__btn-remove"
            eventClick={() => onRemove(goal.id)}
          />
        </div>
      )}
    </div>
  )
}
