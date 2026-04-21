import formatDate from "../../../utils/date";

export type DateCustomPropsType = {
    day: number,
    month: number,
    year: number,
    color?: string
}

// Componente para exibir uma data formatada, com a opção de personalizar a cor do texto.
const DateCustom = ({ day = 21, month = 2, year = 1994, color = "#A6A6A6" }: DateCustomPropsType) =>  {

    const formattedDate = formatDate({ day, month, year });

    return (
        <span style={{ color }}>{formattedDate}</span>
    )
}

export default DateCustom