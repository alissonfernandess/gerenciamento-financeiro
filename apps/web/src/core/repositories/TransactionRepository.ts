import type { Transaction } from "../entities/Transaction"

/**
 * CAMADA: Domínio (core/repositories) — PORT (Ports and Adapters)
 *
 * MUDANÇA: antes o UserContext chamava direto `getTransactions()` de
 * `data/index.ts`, então a apresentação conhecia de onde os dados vinham.
 * Agora o domínio só declara O QUE precisa (esta interface). COMO e DE ONDE
 * (mock, localStorage, API) é decidido em `infrastructure/`.
 * Isso é a Inversão de Dependência (o "D" do SOLID): o core define o
 * contrato e a infraestrutura o implementa.
 */
export interface TransactionRepository {
    getAll(): Transaction[]
}
