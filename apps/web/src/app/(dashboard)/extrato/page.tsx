"use client"

import { TransactionLine } from "@repo/ui"
import { FiEdit2 } from "react-icons/fi"
import "./page.scss"
import { useExtrato } from "./hooks/useExtrato"

export default function ExtratoPage() {
    const { transactions } = useExtrato()

    return (
        <div className="extrato-page">
            <div className="extrato-card">
                <div className="extrato-top-header">
                    <h1 className="extrato-title">Extrato</h1>
                    <button className="edit-btn" aria-label="Editar extrato">
                        <FiEdit2 size={20} />
                    </button>
                </div>

                <div className="extrato-table">
                    <div className="extrato-thead">
                        <span>Lançamentos</span>
                        <span>Data</span>
                        <span>Valor(R$)</span>
                    </div>

                    <div className="extrato-tbody">
                        {transactions.map((transaction: ITransaction, index: number) => (
                            <TransactionLine
                                key={transaction.key}
                                index={index}
                                date={transaction.date}
                                value={transaction.value}
                                operationBank={transaction.operationBank}
                                transactionType={transaction.transactionType}
                                description={transaction.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}