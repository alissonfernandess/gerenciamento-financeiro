import { IconType } from "react-icons"
import DateCustom, { DateCustomPropsType } from "../DateCustom"
import Amount, { AmountPropsType } from "../Amount"
import { FaPix, FaMoneyBill } from "react-icons/fa6"
import { TbMoneybagMove, TbMoneybagMoveBack, TbArrowsExchange, TbArrowsExchange2 } from "react-icons/tb"
import './TransactionLine.scss'

type TransactionLinePropsType = DateCustomPropsType & AmountPropsType & {
    Icon?: IconType,
    transactionType: "pix" | "boleto" | "saque" | "deposito" | "ted" | "doc",
    description?: string,
    index?: number
}

const iconMap: Record<TransactionLinePropsType['transactionType'], IconType> = {
    pix: FaPix,
    deposito: TbMoneybagMoveBack,
    boleto: FaMoneyBill,
    saque: TbMoneybagMove,
    ted: TbArrowsExchange,
    doc: TbArrowsExchange2
};

// Componente para exibir uma linha de transação, incluindo um ícone, descrição da transação, data e valor formatado.
export const TransactionLine = ({ index, Icon, transactionType = "pix", ...props }: TransactionLinePropsType) => {
    const finalColor = index !== undefined ? (index % 2 === 0 ? "primary" : "secondary") : "primary";
    Icon = iconMap[transactionType]
    return (
        <div className={`transactionLine ${finalColor == "primary" ? "primarybackgroundColor" : "secondarybackgroundColor"}`}>
            <section>
                <Icon size={31} />
            </section>
            <section>
                {props.description ? props.description : transactionType}
            </section>
            <section>
                <DateCustom date={props.date} />
            </section>
            <section >
                <Amount value={props.value} hasCurrencySymbol={props.hasCurrencySymbol} operationBank={props.operationBank} />
            </section>
        </div>
    )
}
