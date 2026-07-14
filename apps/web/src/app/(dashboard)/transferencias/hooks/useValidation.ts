export type ValidationError = {
    field: string
    message: string
}

export function useValidation() {
    function validateDestinatario(
        selectedContact: IContato | null,
        search: string
    ): ValidationError | null {
        if (!selectedContact && !search.trim()) {
            return { field: "destinatario", message: "Informe o destinatário" }
        }

        if (!selectedContact && search.trim()) {
            const isNumeric = /^\d+$/.test(search.replace(/[.\-\/]/g, ""))
            const clean = search.replace(/[.\-\/]/g, "")

            if (isNumeric && clean.length !== 11 && clean.length !== 14) {
                return {
                    field: "destinatario",
                    message: "CPF deve ter 11 dígitos ou CNPJ 14 dígitos",
                }
            }

            if (!isNumeric && search.trim().length < 3) {
                return {
                    field: "destinatario",
                    message: "Nome deve ter pelo menos 3 caracteres",
                }
            }
        }

        return null
    }

    function validateTipo(selectedType: string): ValidationError | null {
        if (!selectedType) {
            return { field: "tipo", message: "Selecione o tipo de transação" }
        }
        return null
    }

    function validateValor(
        valor: string,
        saldo: number
    ): ValidationError | null {
        const numeric = parseFloat(valor.replace(/[^\d,]/g, "").replace(",", "."))

        if (!valor || isNaN(numeric) || numeric <= 0) {
            return { field: "valor", message: "Informe um valor válido" }
        }

        if (numeric < 0.01) {
            return { field: "valor", message: "Valor mínimo é R$ 0,01" }
        }

        if (numeric > 50000) {
            return { field: "valor", message: "Valor máximo por transferência é R$ 50.000,00" }
        }

        if (numeric > saldo) {
            return { field: "valor", message: "Saldo insuficiente para esta transferência" }
        }

        return null
    }

    return { validateDestinatario, validateTipo, validateValor }
}