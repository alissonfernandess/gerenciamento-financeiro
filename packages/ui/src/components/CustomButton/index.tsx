'use client'

export type customButtonProps = {
    type: "button" | "submit",
    text?: string,
    fontColor: string,
    backgroundColor: string,
    children?: React.ReactNode,
    eventClick?: () => void,
    hasBackgroundColor?: boolean,
    style?: React.CSSProperties,
    darkMode?: boolean
}

const CustomButton = ({hasBackgroundColor = false, ...props}: customButtonProps) => {

  const style = {
    color: props.fontColor,
    backgroundColor: hasBackgroundColor ? props.backgroundColor : "transparent",
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