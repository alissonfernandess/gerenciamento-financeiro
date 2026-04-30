import { IoIosArrowForward } from "react-icons/io"
import Contact from "../Contact"
import { CustomInput } from "../CustomInput/CustomInput"
import FrameImg from "../FrameImg"
import Title from "../Title"
import styles from './ContactList.module.scss'

export const ContactList = () => {
  return (
    <FrameImg className={styles.ContactList} style={{width: "700px", minHeight: "500px"}}>
        <Title text="Informe quem vai receber a transferência" as="h2"/>
        <Title text="Insira os dados do destinatário" as="h4" style={{color: "gray", fontWeight: "initial", fontSize: "18px"}}/>
        <CustomInput 
            placeholder="Nome, CPF/CNPJ ou Chave Pix" 
            style={{color: "white",backgroundColor: "transparent", marginTop: "20px", fontSize: "20px", fontWeight: "bold", borderBottom: "2px solid gray"}} 
            required={false}
        />
        <Title text="Contatos" as="h3" style={{marginTop: "20px"}}/>
        <ul className={styles.List}>
            <li>
                <Contact name="Ruan Mesquita" style={{color: "gray", fontWeight: "bold"}}/>
                <IoIosArrowForward/>
            </li>
            <li>
                <Contact name="Alisson Fernandes" style={{color: "gray", fontWeight: "bold"}}/>
                <IoIosArrowForward/>
            </li>
            <li>
                <Contact name="Ricardo Lima" style={{color: "gray", fontWeight: "bold"}}/>
                <IoIosArrowForward/>
            </li>
            <li>
                <Contact name="Carlo Ancellotti" style={{color: "gray", fontWeight: "bold"}}/>
                <IoIosArrowForward/>
            </li>

        </ul>
    </FrameImg>
  )
}