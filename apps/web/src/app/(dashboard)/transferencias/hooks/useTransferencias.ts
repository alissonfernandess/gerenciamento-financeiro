import { useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"
import { keys } from "@repo/ui"

export function useTransferencias() {
    const { user, setUser } = useUser()
    const router = useRouter()

    const [step, setStep] = useState<1 | 2>(1)
    const [selectedType, setSelectedType] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedContact, setSelectedContact] = useState<IContato | null>(null)
    const [valor, setValor] = useState("")
    const [error, setError] = useState("")
    const [typeError, setTypeError] = useState(false)

    const filteredContacts = user?.contatos.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelectContact = (contact: IContato) => {
        setSelectedContact(contact)
        setSearch(contact.name)
    }

    const handleContinue = () => {
        let hasError = false
        setError("")
        setTypeError(false)

        if (!selectedType) {
            setTypeError(true)
            hasError = true
        }

        if (!selectedContact && !search) {
            setError("Informe o destinatário")
            hasError = true
        } else if (!selectedContact) {
            const isNumeric = /^\d+$/.test(search.replace(/[.\-\/]/g, ""))
            const cleanSearch = search.replace(/[.\-\/]/g, "")
            
            if (isNumeric && cleanSearch.length !== 11 && cleanSearch.length !== 14) {
                setError("CPF deve ter 11 dígitos ou CNPJ 14 dígitos")
                hasError = true
            } else if (!isNumeric && search.length < 3) {
                setError("O nome ou chave deve ter pelo menos 3 caracteres")
                hasError = true
            }
        }

        if (!hasError) {
            setStep(2)
        }
    }

    const handleConcluir = () => {
        if (!user || !valor) return

        const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, "").replace(",", "."))
        
        if (isNaN(valorNumerico) || valorNumerico <= 0) {
            alert("Valor inválido")
            return
        }

        if (valorNumerico > user.saldo) {
            alert("Saldo insuficiente")
            return
        }

        const novoSaldo = user.saldo - valorNumerico

        const novaTransacao: ITransaction = {
            key: Date.now(),
            date: new Date().toISOString().slice(0, 10),
            value: valorNumerico,
            operationBank: "withdrawal",
            transactionType: (selectedType.toLowerCase() || "pix") as TransactionType,
            description: `Transferência para ${selectedContact?.name || search}`,
            bckColor: "secondary",
        }

        const usuarioAtualizado = {
            ...user,
            saldo: novoSaldo,
            transacoes: [novaTransacao, ...user.transacoes]
        }

        setUser(usuarioAtualizado)
        

        router.push("/dashboard")

    }

    return {
        user,
        step,
        setStep,
        selectedType,
        setSelectedType,
        dropdownOpen,
        setDropdownOpen,
        search,
        setSearch,
        selectedContact,
        valor,
        setValor,
        error,
        setError,
        typeError,
        setTypeError,
        filteredContacts,
        handleSelectContact,
        handleContinue,
        handleConcluir
    }
}
