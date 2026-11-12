/**
 * CAMADA: Domínio (core/entities)
 *
 * MUDANÇA: estes tipos viviam em `types/global.d.ts` como tipos GLOBAIS
 * (ITransaction, TransactionType...), ou seja, qualquer arquivo "enxergava" o
 * tipo sem importar nada. Isso esconde dependências e impede o domínio de ser
 * um módulo isolado. Agora a entidade é explícita e importada onde é usada.
 *
 * Regra da camada: arquivos em `core/` NÃO podem importar react, next nem
 * nada de `infrastructure/`. Só TypeScript puro.
 */

export type OperationBank = "withdrawal" | "deposit"

export type TransactionType = "pix" | "boleto" | "saque" | "deposito" | "ted" | "doc"

export type Color = "primary" | "secondary"

export interface Transaction {
    key: number
    date: string
    value: number
    operationBank: OperationBank
    transactionType: TransactionType
    description: string
    bckColor: Color
}

/**
 * Formas de transferência que o usuário pode escolher na tela.
 * MUDANÇA: antes era `transactionTypes` em `data/index.ts` (pasta de dados
 * mockados). Que tipos de transferência existem é uma regra do domínio, não
 * um dado de mock, por isso foi para a entidade.
 */
export const TRANSFER_TYPES = ["Pix", "TED", "DOC", "Boleto"] as const
