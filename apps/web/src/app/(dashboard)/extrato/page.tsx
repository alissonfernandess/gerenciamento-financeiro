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
            <FiEdit2 size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Filtros */}
        <div
          className="extrato-filters"
          role="search"
          aria-label="Filtros do extrato"
        >
          <div className="extrato-filters__search-wrapper">
            <FiSearch
              className="extrato-filters__search-icon"
              size={16}
              aria-hidden="true"
            />
            <input
              className="extrato-filters__search"
              type="search"
              placeholder="Buscar transação..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Buscar transações por descrição ou tipo"
            />
          </div>

          <div
            className="extrato-filters__types"
            role="group"
            aria-label="Filtrar por tipo de transação"
          >
            {TRANSACTION_TYPES.map((type) => (
              <button
                key={type}
                className={`extrato-filters__chip ${typeFilter === type ? "active" : ""}`}
                onClick={() => handleTypeFilter(type as any)}
                aria-pressed={typeFilter === type}
                aria-label={`Filtrar por ${type}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela */}
        <div className="extrato-table" role="region" aria-label="Tabela de transações">
          <div className="extrato-thead" role="row" aria-hidden="true">
            <span>Lançamentos</span>
            <span>Data</span>
            <span>Valor(R$)</span>
          </div>

          <div
            className="extrato-tbody"
            role="list"
            aria-label="Lista de transações"
            aria-live="polite"
            aria-atomic="false"
          >
            {transactions.length === 0 ? (
              <p className="extrato-empty" role="status">
                Nenhuma transação encontrada.
              </p>
            ) : (
              transactions.map((transaction: any, index: number) => (
                <div role="listitem" key={transaction.key}>
                  <TransactionLine
                    index={index}
                    date={transaction.date}
                    value={transaction.value}
                    operationBank={transaction.operationBank}
                    transactionType={transaction.transactionType}
                    description={transaction.description}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="extrato-load-more">
            <button
              className="extrato-load-more__btn"
              onClick={loadMore}
              aria-label={`Carregar mais transações. ${total - transactions.length} restantes`}
            >
              Carregar mais ({total - transactions.length} restantes)
            </button>
          </div>
        )}

      </div>
    </div>
  )
}