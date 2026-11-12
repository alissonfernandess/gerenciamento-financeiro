import type { Contact } from "../entities/Contact"
import type { Transaction, TransactionType } from "../entities/Transaction"

/**
 * CAMADA: Domínio (core/services) — Domain Service
 *
 * MUDANÇA: estas regras de negócio estavam DENTRO do hook `useTransferencias`
 * (validação de CPF/CNPJ, parse do valor, checagem de saldo, montagem da
 * transação), misturadas com `useState`, `alert()` e `router.push`.
 * Agora são funções puras: recebem dados, devolvem resultado. Não usam React,
 * não mostram alert, não navegam. O hook só chama o service e decide como
 * exibir o resultado. Benefício extra: dá para testar sem renderizar nada.
 */

/** Resultado de uma validação: `null` = válido, string = mensagem de erro. */
export type ValidationError = string | null

/** Regra: a forma de transferência (Pix, TED...) é obrigatória. */
export function isTransferTypeValid(selectedType: string): boolean {
    return !!selectedType
}

/**
 * Regra: valida o destinatário digitado.
 * - Contato da lista selecionado → sempre válido.
 * - Só números → precisa ter 11 (CPF) ou 14 (CNPJ) dígitos.
 * - Texto → nome/chave com pelo menos 3 caracteres.
 * (Lógica movida sem alteração de comportamento a partir de `handleContinue`.)
 */
export function validateRecipient(search: string, selectedContact: Contact | null): ValidationError {
    if (!selectedContact && !search) {
        return "Informe o destinatário"
    }

    if (!selectedContact) {
        const cleanSearch = search.replace(/[.\-/]/g, "")
        const isNumeric = /^\d+$/.test(cleanSearch)

        if (isNumeric && cleanSearch.length !== 11 && cleanSearch.length !== 14) {
            return "CPF deve ter 11 dígitos ou CNPJ 14 dígitos"
        }

        if (!isNumeric && search.length < 3) {
            return "O nome ou chave deve ter pelo menos 3 caracteres"
        }
    }

    return null
}

/**
 * Regra: converte o texto do campo de valor ("1.234,56") em número.
 * Retorna NaN se não for um número.
 */
export function parseAmount(raw: string): number {
    return parseFloat(raw.replace(/[^\d,]/g, "").replace(",", "."))
}

export interface CreateTransferInput {
    /** Saldo atual da conta. */
    balance: number
    /** Valor digitado no campo (texto cru). */
    rawAmount: string
    /** Forma escolhida na tela ("Pix", "TED"...). */
    selectedType: string
    /** Nome do destinatário (contato escolhido ou texto digitado). */
    recipientName: string
    /**
     * Momento da transferência. É um PARÂMETRO (e não `new Date()` aqui dentro)
     * para o service continuar determinístico e fácil de testar.
     */
    now: Date
}

export type CreateTransferResult =
    | { ok: true; transaction: Transaction; newBalance: number }
    | { ok: false; error: string }

/**
 * Regra principal: valida valor e saldo e monta a transação de saída.
 * Não altera estado nenhum: só calcula. Quem persiste/atualiza a tela é a
 * camada de apresentação (e, no futuro, um repositório de escrita).
 */
export function createTransfer(input: CreateTransferInput): CreateTransferResult {
    const amount = parseAmount(input.rawAmount)

    if (isNaN(amount) || amount <= 0) {
        return { ok: false, error: "Valor inválido" }
    }

    if (amount > input.balance) {
        return { ok: false, error: "Saldo insuficiente" }
    }

    const transaction: Transaction = {
        key: input.now.getTime(),
        date: input.now.toISOString().slice(0, 10),
        value: amount,
        operationBank: "withdrawal",
        transactionType: (input.selectedType.toLowerCase() || "pix") as TransactionType,
        description: `Transferência para ${input.recipientName}`,
        bckColor: "secondary",
    }

    return { ok: true, transaction, newBalance: input.balance - amount }
}
