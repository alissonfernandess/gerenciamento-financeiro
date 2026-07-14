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
        valorError,
        handleSelectContact,
        handleContinue,
        handleConcluir
    } = useTransferencias()

    return (
        <div role="main" aria-label="Página de transferências">

            {/* Indicador de progresso para leitores de tela */}
            <div role="status" aria-live="polite" className="sr-only">
                {step === 1
                    ? "Passo 1 de 2: Informe o destinatário e o tipo de transferência"
                    : "Passo 2 de 2: Confirme os dados e o valor da transferência"}
            </div>

            {step === 1 ? (
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
            ) : (
                <StepConfirmacao
                    user={user}
                    selectedContact={selectedContact}
                    search={search}
                    selectedType={selectedType}
                    valor={valor}
                    valorError={valorError}
                    setValor={setValor}
                    handleConcluir={handleConcluir}
                />
            )}
        </div>
    )
}