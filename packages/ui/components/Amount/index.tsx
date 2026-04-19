import { formatCurrency, getSignal } from '../../utils/functions';

export type AmountPropsType = {
    value: number,
    operationBank?: "deposit" | "withdrawal"
    hasCurrencySymbol?: boolean

}

const operationConfig = {
    deposit: {
        signal: "+",
        className: "deposit"
    } ,
    withdrawal: {
        signal: "-",
        className: "withdrawal"
    }
}


const Amount = ({ value, operationBank = "deposit", hasCurrencySymbol = true }: AmountPropsType) => {

    const formattedValue = formatCurrency(value);
    const signal = getSignal(operationBank);
    const className = `Amount ${operationConfig[operationBank].className}`;

    return (
        <span className={className}>
            {signal} {hasCurrencySymbol && "R$"} {formattedValue}
        </span>
    )
}

export default Amount