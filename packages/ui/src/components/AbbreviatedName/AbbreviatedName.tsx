import { getAbbreviationFromWord } from "../../../utils/functions"

export type AbbreviatedNamePropsType = {
    completedName: string,
    circleColor?: string,
    fontColor?: string
}

// Componente para exibir o nome abreviado de um usuário, com a opção de personalizar as cores do círculo.

const AbbreviatedName = ({completedName, circleColor = "#354973", fontColor= "white"} : AbbreviatedNamePropsType) => {

    const style = {
        color: fontColor,
        backgroundColor: circleColor,
        padding: "5px",
        borderRadius: "50%",
        fontWeight: "bold",
        fontSize: "1.1em"

    }
    const abbreviatedName = getAbbreviationFromWord(completedName)
    
    return (
        <span style={style}>
            {abbreviatedName}
        </span>
    )
}

export default AbbreviatedName