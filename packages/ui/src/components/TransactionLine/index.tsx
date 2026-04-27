import { IconType } from "react-icons"
import DateCustom, { DateCustomPropsType } from "../DateCustom"
import Amount, { AmountPropsType } from "../Amount"
import { FaPix, FaMoneyBill } from "react-icons/fa6"
import {TbMoneybagMove, TbMoneybagMoveBack } from "react-icons/tb"
import './TransactionLine.scss'

type TransactionLinePropsType = DateCustomPropsType & AmountPropsType & {
    Icon?: IconType,
    transactionType: "pix"  | "boleto" | "saque" | "deposito",
    bckColor?: "primary" | "secondary",
    description?: string
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
    <div className={`transactionLine ${bckColor == "primary" ? "primarybackgroundColor" : "secondarybackgroundColor"}`}>
        <section>
            <Icon size={31}/>
        </section>
        <section>
            {props.description ? props.description : transactionType}
        </section>
        <section>
            <DateCustom day={props.day} month={props.month} year={props.year}/>
        </section>
        <section>
            <Amount value={props.value} hasCurrencySymbol={props.hasCurrencySymbol} operationBank={props.operationBank}/>
        </section>
    </div>
  )
}

export default TransactionLine