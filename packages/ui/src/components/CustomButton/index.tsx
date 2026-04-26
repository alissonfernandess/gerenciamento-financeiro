'use client'

import './CustomButton.scss'

export type customButtonProps = {
    type: "button" | "submit",
    text?: string,
    children?: React.ReactNode,
    eventClick?: () => void,
    hasBackgroundColor?: boolean,
    style?: React.CSSProperties,
}

// Componente de botão personalizado que aceita várias propriedades para personalização, incluindo cor, tipo e evento de clique.
const CustomButton = ({hasBackgroundColor = false, ...props}: customButtonProps) => {

  const style = {
    backgroundColor: !hasBackgroundColor ? "transparent" : undefined,
  }

  return (
    <button className="CustomButton"
            type={props.type} style={{...style, ...props.style}} 
            onClick={
              props.eventClick ? props.eventClick : () => {console.log('Button clicked')}
            }
    >
        {props.children}
        <span>
            {props.text?.toLocaleUpperCase()}
        </span>
        
    </button>
  )
}

export default CustomButton