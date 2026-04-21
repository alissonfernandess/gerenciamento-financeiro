import { IconType } from "react-icons"
import DateCustom, { DateCustomPropsType } from "../DateCustom"
import Amount, { AmountPropsType } from "../Amount"
import { FaPix, FaMoneyBill } from "react-icons/fa6"
import {TbMoneybagMove, TbMoneybagMoveBack } from "react-icons/tb"
import './TransactionLine.scss'

type TransactionLinePropsType = DateCustomPropsType & AmountPropsType & {
    Icon: IconType,
    transactionType: "pix"  | "boleto" | "saque" | "deposito",
    bckColor?: string
}

const iconMap: Record<TransactionLinePropsType['transactionType'], IconType> = {
  pix: FaPix,
  deposito: TbMoneybagMoveBack,
  boleto: FaMoneyBill,
  saque: TbMoneybagMove

};

// Componente para exibir uma linha de transação, incluindo um ícone, descrição da transação, data e valor formatado.
const TransactionLine = ({bckColor = "primary", Icon, transactionType = "pix", ...props } : TransactionLinePropsType) => {
    Icon = iconMap[transactionType]
  return (
    <tr className={`transactionLine ${bckColor == "primary" ? "primarybackgroundColor" : "secondarybackgroundColor"}`}>
        <td>
            <Icon size={31}/>
        </td>
        <td>
            {transactionType.toUpperCase()}
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