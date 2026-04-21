import { checkToUpperCase } from "../../../utils/functions";

export type ContactNamePropsType = {
    contactName: string,
    fontColor?: string,
    toUpperCase?: boolean,
    fontSize?: string,
}

const ContactName = ({contactName, fontColor, toUpperCase = false, fontSize= "14px"} : ContactNamePropsType) => {
    const style = {
        color: fontColor,
        fontSize: fontSize
    }

    contactName = checkToUpperCase(contactName, toUpperCase)

  return (
    <h4 style={style}>
        {contactName}
    </h4>
  )
}

export default ContactName