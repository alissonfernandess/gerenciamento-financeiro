"use client"

import { ProfileOverview, TransactionLine } from "@repo/ui"
import "./page.scss"
import { useDashboard } from "./hooks/useDashboard"

export default function DashboardPage() {
    const { user, recentTransactions } = useDashboard()

    return (
        <div className="dashboard-page">
            <div className="profile-section">
                <ProfileOverview name={user?.nome ?? ''} amount={user?.saldo ?? 0} />
            </div>

            <div className="extrato-section">
                <div className="extrato-header-title">
                    <h2 className="title">Extrato</h2>
                </div>

                <div className="extrato-table">
                    <div className="extrato-thead">
                        <span>Lançamentos</span>
                        <span>Data</span>
                        <span>Valor(R$)</span>
                    </div>

                    <div className="extrato-tbody">
                        {recentTransactions.map((transaction, index) => (
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