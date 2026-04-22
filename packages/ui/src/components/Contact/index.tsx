import { AbbreviatedName } from "@repo/ui";
import ContactName from '../ContactName'

type ContactPropsType = {
  gap?: string,
  name: string
}

//  Componente que renderiza os componentes ContactName e AbbreviationName, ambos recebem a prop comum name
const Contact = ({ gap, name = "John Doe" }: ContactPropsType) => {

  return (
    <div style={{ gap }} className='Contact'>
      <AbbreviatedName completedName={name} />
      <ContactName contactName={name} />
    </div>
  )
}

export default Contact