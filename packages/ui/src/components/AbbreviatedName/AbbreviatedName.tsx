import { getAbbreviationFromWord } from "../../../utils/functions"
import "./AbbreviatedName.scss"

export type AbbreviatedNamePropsType = {
    completedName: string,
    circleColor?: string,
    size?: number
}

// Componente para exibir o nome abreviado de um usuário, com a opção de personalizar as cores do círculo.

export const AbbreviatedName = ({completedName = "Geralt Rivia", circleColor = "#354973", size = 61} : AbbreviatedNamePropsType) => {

    const style = {
        backgroundColor: circleColor
    }
    const abbreviatedName = getAbbreviationFromWord(completedName)
    
    return (
        <span style={style} className="AbbreviatedName">
            {abbreviatedName}
        </span>
    )
}
