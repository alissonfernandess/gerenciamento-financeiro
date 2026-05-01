"use client"

import { ProfileOverview, TransactionLine } from "@repo/ui"
import "./page.scss"

export default function DashboardPage() {
    return (
        <div className="dashboard-page">
            <div className="profile-section">
                <ProfileOverview name="Felipe" amount={2000} />
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
                        <TransactionLine 
                            day={3} month={2} year={2026}
                            value={300}
                            operationBank="withdrawal"
                            transactionType="saque"
                            description="Transferência Doc para Nubank"
                            bckColor="secondary"
                        />
                        <TransactionLine 
                            day={2} month={2} year={2026}
                            value={250}
                            operationBank="deposit"
                            transactionType="pix"
                            description="Transferência Pix de João"
                            bckColor="primary"
                        />
                        <TransactionLine 
                            day={10} month={1} year={2026}
                            value={300}
                            operationBank="withdrawal"
                            transactionType="boleto"
                            description="Pagamento via boleto"
                            bckColor="secondary"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}