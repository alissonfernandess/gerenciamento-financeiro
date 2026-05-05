import { customButtonProps, CustomButton } from "../CustomButton";

import "./IconBtn.scss";

type IconBtnProps = customButtonProps & {
  icon: React.ElementType;
  iconSize?: number;
  iconDirection?: "row" | "column";
  inverted?: boolean;
};

const IconBtn = ({
  icon: Icon,
  iconSize = 32,
  iconDirection = "row",
  inverted = false,
  style,
  ...props
}: IconBtnProps) => {

  const reverseDirection =
    inverted
      ? iconDirection === "row"
        ? "row-reverse"
        : "column-reverse"
      : iconDirection;

  return (
    <CustomButton
      {...props}
      className="IconBtn"
      style={{
        flexDirection: reverseDirection,
        ...style
      }}
    >
      <Icon size={iconSize} />
    </CustomButton>
  );
};

export default IconBtn;
