import CustomButton, { customButtonProps } from "../button"

type IconBtnProps = customButtonProps & {
    icon: React.ElementType,
    iconSize?: number,
    iconDirection?: "row" | "column",
    gap?: string
}

const IconBtn = ({iconDirection = "row", icon: Icon, gap = "10px", ...props}: IconBtnProps) => {

  return (
    <CustomButton type={props.type} 
                  text={props.text} 
                  fontColor={props.fontColor} 
                  backgroundColor={props.backgroundColor} 
                  eventClick={props.eventClick} 
                  hasBackgroundColor={props.hasBackgroundColor}
                  style={{display: "flex", flexDirection: iconDirection, alignItems: "center", justifyContent: "center", gap: gap}} // Let the IconBtn component control the style for display flex
                  >
                  
        <Icon color={props.fontColor } 
              size={props.iconSize || 32}

              
        />
    </CustomButton>
  ) 
}

export default IconBtn