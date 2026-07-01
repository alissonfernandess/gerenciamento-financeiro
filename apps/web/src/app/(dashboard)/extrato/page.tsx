"use client"

import { TransactionLine } from "@repo/ui"
import { FiEdit2, FiSearch } from "react-icons/fi"
import "./page.scss"
import { useExtrato } from "./hooks/useExtrato"

const TRANSACTION_TYPES = ["todos", "pix", "boleto", "saque", "deposito", "ted", "doc"] as const

export default function ExtratoPage() {
  const {
    transactions,
    total,
    hasMore,
    search,
    typeFilter,
    loadMore,
    handleSearch,
    handleTypeFilter,
  } = useExtrato()

  return (
    <div className="extrato-page">
      <div className="extrato-card">
        <div className="extrato-top-header">
          <h1 className="extrato-title">Extrato</h1>
          <button className="edit-btn" aria-label="Editar extrato">
            <FiEdit2 size={20} />
          </button>
        </div>

        {/* Filtros */}
        <div className="extrato-filters">
          <div className="extrato-filters__search-wrapper">
            <FiSearch className="extrato-filters__search-icon" size={16} />
            <input
              className="extrato-filters__search"
              type="text"
              placeholder="Buscar transação..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="extrato-filters__types">
            {TRANSACTION_TYPES.map((type) => (
              <button
                key={type}
                className={`extrato-filters__chip ${typeFilter === type ? "active" : ""}`}
                onClick={() => handleTypeFilter(type as any)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="extrato-table">
          <div className="extrato-thead">
            <span>Lançamentos</span>
            <span>Data</span>
            <span>Valor(R$)</span>
          </div>

          <div className="extrato-tbody">
            {transactions.length === 0 ? (
              <p className="extrato-empty">Nenhuma transação encontrada.</p>
            ) : (
              transactions.map((transaction: any, index: number) => (
                <TransactionLine
                  key={transaction.key}
                  index={index}
                  date={transaction.date}
                  value={transaction.value}
                  operationBank={transaction.operationBank}
                  transactionType={transaction.transactionType}
                  description={transaction.description}
                />
              ))
            )}
          </div>
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="extrato-load-more">
            <button className="extrato-load-more__btn" onClick={loadMore}>
              Carregar mais ({total - transactions.length} restantes)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}