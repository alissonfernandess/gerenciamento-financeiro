import { useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"
import { useValidation } from "./useValidation"

export function useTransferencias() {
    const { user, setUser } = useUser()
    const router = useRouter()
    const { validateDestinatario, validateTipo, validateValor } = useValidation()

    const [step, setStep] = useState<1 | 2>(1)
    const [selectedType, setSelectedType] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedContact, setSelectedContact] = useState<IContato | null>(null)
    const [valor, setValor] = useState("")
    const [error, setError] = useState("")
    const [typeError, setTypeError] = useState(false)
    const [valorError, setValorError] = useState("")

    const filteredContacts = user?.contatos.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelectContact = (contact: IContato) => {
        setSelectedContact(contact)
        setSearch(contact.name)
        setError("")
    }

    const handleContinue = () => {
        setError("")
        setTypeError(false)

        const tipoErr = validateTipo(selectedType)
        const destErr = validateDestinatario(selectedContact, search)

        if (tipoErr) setTypeError(true)
        if (destErr) setError(destErr.message)
        if (tipoErr || destErr) return

        setStep(2)
    }

    const handleConcluir = (attachments: IAttachment[] = [], description?: string) => {
    if (!user) return

    const valorErr = validateValor(valor, user.saldo)
    if (valorErr) {
        setValorError(valorErr.message)
        return
    }

    setValorError("")

    const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, "").replace(",", "."))

    const novaTransacao: ITransaction = {
        key: Date.now(),
        date: new Date().toISOString().slice(0, 10),
        value: valorNumerico,
        operationBank: "withdrawal",
        transactionType: (selectedType.toLowerCase() || "pix") as TransactionType,
        description: description || `Transferência para ${selectedContact?.name || search}`,
        bckColor: "secondary",
        attachments,
    }

    setUser({
        ...user,
        saldo: user.saldo - valorNumerico,
        transacoes: [novaTransacao, ...user.transacoes],
    })

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
        valorError,
        typeError,
        setTypeError,
        filteredContacts,
        handleSelectContact,
        handleContinue,
        handleConcluir,
    }
}