
// Utilitário para formatação de data, mantendo os valores válidos para dia e mês

type dateType = {
    day: number,
    month: number,
    year: number
}

const date = new Date()

const MAX_DAY = 31;
const MAX_MONTH = 12;
const MIN_DAY = 1;
const MIN_MONTH = 1;
const MIN_YEAR = date.getFullYear()


const formatDate = ({ day, month, year }: dateType) => {

    day = day > MAX_DAY ? MAX_DAY : day < MIN_DAY ? MIN_DAY : day; // Ensure day is between 1 and 31
    month = month > MAX_MONTH ? MAX_MONTH : month < MIN_MONTH ? MIN_MONTH : month; // Ensure month is between 1 and 12
    year = (year <= 0 || `${year}`.length < 4) ? MIN_YEAR : year // Ensure the current year as the minimal selectable year

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
}

export default formatDate