export function getSaldo() {
    return Math.floor(Math.random() * 100000000)
}

export function getTransactions(): ITransaction[] {
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

export function getContacts() {
    return [
        { name: "Lucas Moura" },
        { name: "Ana Larissa" },
        { name: "Mirela" },
    ]
}

export const transactionTypes = ["Pix", "TED", "DOC", "Boleto"]

export const descriptionSuggestions: Record<string, string[]> = {
    Pix: [
        "Transferência Pix para amigo",
        "Pagamento de serviço via Pix",
        "Reembolso via Pix",
        "Aluguel via Pix",
        "Compra via Pix",
    ],
    TED: [
        "Transferência TED bancária",
        "Pagamento de fornecedor via TED",
        "Transferência entre contas TED",
        "Salário via TED",
    ],
    DOC: [
        "Transferência DOC entre bancos",
        "Pagamento via DOC",
        "Transferência DOC programada",
    ],
    Boleto: [
        "Pagamento de boleto de água",
        "Pagamento de boleto de energia",
        "Pagamento de boleto de internet",
        "Pagamento de aluguel via boleto",
        "Pagamento de escola via boleto",
        "Pagamento de cartão via boleto",
    ],
}

export const validationRules = {
    valor: {
        min: 0.01,
        max: 50000,
    },
    destinatario: {
        minNameLength: 3,
        cpfLength: 11,
        cnpjLength: 14,
    },
}