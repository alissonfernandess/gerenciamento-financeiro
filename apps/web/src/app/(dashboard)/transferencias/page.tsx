"use client"

import "./page.scss"
import { useTransferencias } from "./hooks/useTransferencias"
import { StepDestinatario } from "./components/StepDestinatario"
import { StepConfirmacao } from "./components/StepConfirmacao"

export default function TransferenciasPage() {
    const {
        user,
        step,
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
        handleSelectContact,
        handleContinue,
        handleConcluir
    } = useTransferencias()

    if (step === 1) {
        return (
            <StepDestinatario
                user={user}
                search={search}
                setSearch={setSearch}
                error={error}
                setError={setError}
                selectedContact={selectedContact}
                handleSelectContact={handleSelectContact}
                handleContinue={handleContinue}
                selectedType={selectedType}
                typeError={typeError}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                setSelectedType={setSelectedType}
                setTypeError={setTypeError}
            />
        )
    }

    return (
        <StepConfirmacao
            user={user}
            selectedContact={selectedContact}
            search={search}
            selectedType={selectedType}
            valor={valor}
            setValor={setValor}
            handleConcluir={handleConcluir}
        />
    )
}