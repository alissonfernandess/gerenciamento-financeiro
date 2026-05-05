import formatDate from "../../../utils/date";
import "./DateCustom.scss";

export type DateCustomPropsType = {
    date: string
}

// Componente para exibir uma data formatada, com a opção de personalizar a cor do texto.
const DateCustom = ({ date }: DateCustomPropsType) => {
    const formattedDate = formatDate(date);

    return (
        <span className="DateCustom">{formattedDate}</span>
    )
}

export default DateCustom