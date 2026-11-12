import { useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"
// MUDANÇA (Clean Architecture): as regras de negócio (validar destinatário, parsear
// valor, checar saldo, montar a transação) saíram deste hook e foram para o
// TransferService (core/services). O hook agora só guarda o estado da tela e chama
// o service; não conhece mais as regras, só o resultado delas.
import type { Contact } from "@/core/entities/Contact"
import {
    createTransfer,
    isTransferTypeValid,
    validateRecipient,
} from "@/core/services/TransferService"

export function useTransferencias() {
    const { user, setUser } = useUser()
    const router = useRouter()

    const [step, setStep] = useState<1 | 2>(1)
    const [selectedType, setSelectedType] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [valor, setValor] = useState("")
    const [error, setError] = useState("")
    const [typeError, setTypeError] = useState(false)

    const filteredContacts = user?.contatos.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelectContact = (contact: Contact) => {
        setSelectedContact(contact)
        setSearch(contact.name)
    }

    const handleContinue = () => {
        setError("")
        setTypeError(false)

        // Regras de validação vêm do domínio; aqui só traduzimos o resultado em estado de tela.
        const typeIsValid = isTransferTypeValid(selectedType)
        const recipientError = validateRecipient(search, selectedContact)

        if (!typeIsValid) setTypeError(true)
        if (recipientError) setError(recipientError)

        if (typeIsValid && !recipientError) {
            setStep(2)
        }
    }

    const handleConcluir = () => {
        if (!user || !valor) return

        // O service valida valor/saldo e monta a transação. `now` é passado de fora
        // para o service continuar puro (sem depender do relógio).
        const result = createTransfer({
            balance: user.saldo,
            rawAmount: valor,
            selectedType,
            recipientName: selectedContact?.name || search,
            now: new Date(),
        })

        // Comportamento mantido: erro continua sendo mostrado com alert().
        // (A mensagem agora vem do domínio; trocar alert por toast é tarefa da UI.)
        if (!result.ok) {
            alert(result.error)
            return
        }

        setUser({
            ...user,
            saldo: result.newBalance,
            transacoes: [result.transaction, ...user.transacoes],
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
        typeError,
        setTypeError,
        filteredContacts,
        handleSelectContact,
        handleContinue,
        handleConcluir
    }
}
