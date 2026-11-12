'use client'

import './CustomButton.scss'
import { formatCurrency } from '../../../utils/functions'

export type customButtonProps = {
  type: "button" | "submit"
  text?: string
  children?: React.ReactNode
  eventClick?: () => void
  hasBackgroundColor?: boolean
  style?: React.CSSProperties
  className?: string
  value?: number
}

export const CustomButton = ({
  hasBackgroundColor = false,
  eventClick,
  text,
  children,
  style,
  className,
  type,
  value
}: customButtonProps) => {

  const customStyle = {
    backgroundColor: hasBackgroundColor ? "#091B32" : "transparent",
    ...style
  }

  const label = value !== undefined ? `R$ ${formatCurrency(value)}` : text

  return (
    <button
      type={type}
      className={`CustomButton ${className || ''}`}
      style={customStyle}
      onClick={eventClick}
    >
      {children}

      {label && (
        <span>{label.toUpperCase()}</span>
      )}
    </button>
  )
}

