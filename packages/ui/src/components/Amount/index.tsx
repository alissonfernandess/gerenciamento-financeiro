import { formatCurrency, getSignal } from '../../../utils/functions';
import './Amount.scss';

export type AmountPropsType = {
    value: number,
    operationBank: "deposit" | "withdrawal"
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

// Componente para exibir um valor formatado como moeda, com sinal positivo ou negativo dependendo do tipo de operação (depósito ou retirada).
const Amount = ({ value, operationBank = "deposit", hasCurrencySymbol = true }: AmountPropsType) => {

    const formattedValue = formatCurrency(value);
    const signal = getSignal(operationBank); // Obtém o sinal "+" para depósitos e "-" para retiradas
    const className = `Amount ${operationConfig[operationBank].className}`; // Seleciona a classe com base no sinal de operação

    return (
        <span className={className}>
            {signal} {hasCurrencySymbol && "R$"} {formattedValue}
        </span>
    )
}

export default Amount