import CustomButton, { customButtonProps } from "../CustomButton"

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
                  eventClick={props.eventClick} 
                  hasBackgroundColor={props.hasBackgroundColor}
                  style={{display: "flex", flexDirection: iconDirection, alignItems: "center", justifyContent: "center", gap: gap}} // Let the IconBtn component control the style for display flex
                  >
                  
        <Icon
              size={props.iconSize || 32}
              style={props.style}
              
        />
    </CustomButton>
  ) 
}

export default IconBtn