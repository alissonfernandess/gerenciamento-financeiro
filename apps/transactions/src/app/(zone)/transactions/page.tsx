"use client";

import { TransactionLine } from "@repo/ui";
import { useTransactions } from "@repo/hooks";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import "./page.scss";

export default function TransactionsListPage() {
  const { transactions } = useTransactions();

  return (
    <div className="extrato-page">
      <div className="extrato-card">
        <div className="extrato-top-header">
          <h1 className="extrato-title">Transações</h1>
          <Link
            href="/transactions/transactions/create"
            className="edit-btn"
            aria-label="Nova transação"
          >
            <FiEdit2 size={20} />
          </Link>
        </div>

        <div className="extrato-table">
          <div className="extrato-thead">
            <span>Lançamentos</span>
            <span>Data</span>
            <span>Valor(R$)</span>
          </div>

          <div className="extrato-tbody">
            {transactions.map((transaction, index) => (
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
  );
}
