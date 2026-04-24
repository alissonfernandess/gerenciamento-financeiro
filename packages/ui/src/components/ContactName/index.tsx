import { checkToUpperCase } from "../../../utils/functions";

export type ContactNamePropsType = {
    contactName: string,
    toUpperCase?: boolean,
}

// Componente para exibir nome de contato com opção de conversão para maiúsculo
const ContactName = ({contactName, toUpperCase = false} : ContactNamePropsType) => {
   

    contactName = checkToUpperCase(contactName, toUpperCase)

  return (
    <h4 className="ContactName">
        {contactName}
    </h4>
  )
}

export default ContactName