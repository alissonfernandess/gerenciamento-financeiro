import { IconType } from "react-icons"
import DateCustom, { DateCustomPropsType } from "../DateCustom"
import Amount, { AmountPropsType } from "../Amount"
import { FaPix } from "react-icons/fa6"

type TransactionLinePropsType = DateCustomPropsType & AmountPropsType & {
    Icon: IconType,
    transaction: string,
    bckColor: string
}

// Componente para exibir uma linha de transação, incluindo um ícone, descrição da transação, data e valor formatado.
const TransactionLine = ({bckColor = "primary", Icon = FaPix, transaction, ...props } : TransactionLinePropsType) => {
  return (
    <tr className={`transactionLine ${bckColor == "primary" ? "primarybackgroundColor" : "secondarybackgroundColor"}`}>
        <td>
            <Icon size={31}/>
        </td>
        <td>
            {transaction}
        </td>
        <td>
            <DateCustom day={props.day} month={props.month} year={props.year}/>
        </td>
        <td>
            <Amount value={props.value} hasCurrencySymbol={props.hasCurrencySymbol} operationBank={props.operationBank}/>
        </td>
    </tr>
  )
}

export default TransactionLine