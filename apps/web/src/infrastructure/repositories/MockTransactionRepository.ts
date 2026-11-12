import type { Transaction } from "@/core/entities/Transaction"
import type { TransactionRepository } from "@/core/repositories/TransactionRepository"

/**
 * CAMADA: Infraestrutura — ADAPTER (Ports and Adapters)
 *
 * MUDANÇA: os dados mockados de `data/index.ts → getTransactions()` vieram
 * para cá. Esta classe IMPLEMENTA o contrato `TransactionRepository` definido
 * no domínio. Para trocar por uma API real basta criar
 * `ApiTransactionRepository implements TransactionRepository` e alterar UMA
 * linha em `container.ts`; domínio e telas não mudam.
 */
export class MockTransactionRepository implements TransactionRepository {
    getAll(): Transaction[] {
        return [
            {
                key: 1,
                date: "2026-02-03",
                value: 300,
                operationBank: "withdrawal",
                transactionType: "saque",
                description: "Transferência Doc para Nubank",
                bckColor: "secondary",
            },
            {
                key: 2,
                date: "2026-02-02",
                value: 250,
                operationBank: "deposit",
                transactionType: "pix",
                description: "Transferência Pix de João",
                bckColor: "primary",
            },
            {
                key: 3,
                date: "2026-01-10",
                value: 300,
                operationBank: "withdrawal",
                transactionType: "boleto",
                description: "Pagamento via boleto",
                bckColor: "secondary",
            },
            {
                key: 4,
                date: "2026-02-02",
                value: 250,
                operationBank: "deposit",
                transactionType: "pix",
                description: "Transferência Pix de João",
                bckColor: "primary",
            },
            {
                key: 5,
                date: "2026-01-10",
                value: 300,
                operationBank: "withdrawal",
                transactionType: "boleto",
                description: "Pagamento via boleto",
                bckColor: "secondary",
            },
            {
                key: 6,
                date: "2025-02-10",
                value: 250,
                operationBank: "deposit",
                transactionType: "pix",
                description: "Transferência Pix de João",
                bckColor: "primary",
            },
        ]
    }
}
