import { formatCurrency } from "../../../utils/functions";
import "./DashboardMetric.scss";

export type DashboardMetricProps = {
  title: string;
  value: number;
  variation?: number;
  type?: "positive" | "negative" | "neutral";
};

export const DashboardMetric = ({
  title,
  value,
  variation,
  type = "neutral",
}: DashboardMetricProps) => {
  return (
    <div className={`dashboard-metric dashboard-metric--${type}`}>
      <span className="dashboard-metric__title">{title}</span>

      <strong className="dashboard-metric__value">
        R$ {formatCurrency(value)}
      </strong>

      {variation !== undefined && (
        <span className="dashboard-metric__variation">
          {variation > 0 ? "+" : ""}
          {variation}%
        </span>
      )}
    </div>
  );
};