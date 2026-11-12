import type { Transaction } from "../entities/Transaction"

/**
 * CAMADA: Domínio (core/services) — Domain Service
 *
 * MUDANÇA: o `useDashboard` fazia `transacoes.slice(0, 3)` por conta própria.
 * "O dashboard mostra as 3 últimas movimentações" é uma regra de negócio, então
 * ela mora aqui, com nome e constante, e não como um número solto no hook.
 */
export const RECENT_TRANSACTIONS_LIMIT = 3

export function getRecentTransactions(
    transactions: Transaction[],
    limit: number = RECENT_TRANSACTIONS_LIMIT
): Transaction[] {
    return transactions.slice(0, limit)
}
