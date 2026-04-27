'use client'

import './CustomButton.scss'

export type customButtonProps = {
  type: "button" | "submit"
  text?: string
  children?: React.ReactNode
  eventClick?: () => void
  hasBackgroundColor?: boolean
  style?: React.CSSProperties
  className?: string
}

const CustomButton = ({
  hasBackgroundColor = false,
  eventClick,
  text,
  children,
  style,
  className,
  type
}: customButtonProps) => {

  const customStyle = {
    backgroundColor: hasBackgroundColor ? "#091B32" : "transparent",
    ...style
  }

  return (
    <button
      type={type}
      className={`CustomButton ${className || ''}`}
      style={customStyle}
      onClick={eventClick}
    >
      {children}

      {text && (
        <span>{text.toUpperCase()}</span>
      )}
    </button>
  )
}

export default CustomButton
