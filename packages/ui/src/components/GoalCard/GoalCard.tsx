import { formatCurrency } from "../../../utils/functions"
import "./GoalCard.scss"

export type GoalCardProps = {
  title: string
  current: number
  target: number
}

export const GoalCard = ({ title, current, target }: GoalCardProps) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100)

  return (
    <div className="goal-card">
      <div className="goal-card__header">
        <strong>{title}</strong>
        <span>
          R$ {formatCurrency(current)} / R$ {formatCurrency(target)}
        </span>
      </div>

      <div className="goal-card__progress">
        <div
          className="goal-card__progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="goal-card__percentage">{percentage}%</span>
    </div>
  )
}