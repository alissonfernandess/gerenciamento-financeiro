import { getAbbreviationFromWord } from "../../../utils/functions"
import "./AbbreviatedName.scss"

export type AbbreviatedNamePropsType = {
    completedName: string,
    circleColor?: string,
    fontColor?: string
}

// Componente para exibir o nome abreviado de um usuário, com a opção de personalizar as cores do círculo.

const AbbreviatedName = ({completedName = "Geralt Rivia", circleColor = "#354973", fontColor= "white"} : AbbreviatedNamePropsType) => {

    const style = {
        color: fontColor,
        backgroundColor: circleColor,
       

    }
    const abbreviatedName = getAbbreviationFromWord(completedName)
    
    return (
        <span style={style} className="AbbreviatedName">
            {abbreviatedName}
        </span>
    )
}

export default AbbreviatedName