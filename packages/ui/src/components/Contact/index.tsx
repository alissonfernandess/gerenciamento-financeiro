import { AbbreviatedName } from "@repo/ui";
import ContactName from '../ContactName'
import './Contact.scss';
import { IoIosArrowForward } from "react-icons/io";


type ContactPropsType = {
  name: string,
  style?: React.CSSProperties;
}

//  Componente que renderiza os componentes ContactName e AbbreviationName, ambos recebem a prop comum name
const Contact = ({ name = "John Doe", ...props }: ContactPropsType) => {
  
  const sectionStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  }

  return (
    <div className='Contact' style={props.style}>
      <section style={sectionStyle}>
        <AbbreviatedName completedName={name} />
        <ContactName contactName={name} />
      </section>
      <IoIosArrowForward/>
    </div>
  )
}

export default Contact