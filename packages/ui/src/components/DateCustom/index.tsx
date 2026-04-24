import formatDate from "../../../utils/date";
import "./DateCustom.scss";

export type DateCustomPropsType = {
    day: number,
    month: number,
    year: number,
}

// Componente para exibir uma data formatada, com a opção de personalizar a cor do texto.
const DateCustom = ({ day = 21, month = 2, year = 1994 }: DateCustomPropsType) =>  {

    const formattedDate = formatDate({ day, month, year });

    return (
        <span className="DateCustom">{formattedDate}</span>
    )
}

export default DateCustom