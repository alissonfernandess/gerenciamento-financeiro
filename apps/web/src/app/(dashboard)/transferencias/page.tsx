"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import "./page.scss"
import { useTransferencias } from "./hooks/useTransferencias"
import { StepDestinatario } from "./components/StepDestinatario"

/**
 * MUDANÇA (lazy loading): o passo 2 (confirmação) só aparece depois que o usuário
 * escolhe o destinatário. Antes ele era importado de forma estática, então o código
 * dele ia junto no primeiro download da página, mesmo sem ser usado ainda.
 * Com `next/dynamic`, o Next separa o StepConfirmacao em um arquivo JS próprio
 * (code splitting), baixado só quando necessário.
 *
 * `loadStepConfirmacao` fica numa constante para poder ser chamada à mão (veja o
 * pré-carregamento abaixo): o navegador guarda o resultado, então a segunda
 * chamada (feita pelo dynamic) é instantânea.
 */
const loadStepConfirmacao = () =>
    import("./components/StepConfirmacao").then((module) => module.StepConfirmacao)

const StepConfirmacao = dynamic(loadStepConfirmacao, {
    // Mostrado só se o usuário chegar ao passo 2 antes de o código terminar de carregar.
    loading: () => <p role="status" aria-live="polite" style={{ color: "#fff", padding: 24 }}>Carregando…</p>,
})

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

    /**
     * MUDANÇA (pré-carregamento): lazy loading sozinho trocaria "carregar tudo antes"
     * por "esperar na hora do clique". Para ter os dois benefícios, assim que a tela
     * fica ociosa (o usuário ainda está escolhendo tipo e destinatário) baixamos o
     * código do passo 2 em segundo plano. Quando ele clicar em continuar, o passo
     * aparece na hora, sem espera de rede.
     * requestIdleCallback roda só quando o navegador não tem nada mais importante a
     * fazer; onde ele não existe (Safari), usamos um setTimeout curto como alternativa.
     */
    useEffect(() => {
        const preload = () => { void loadStepConfirmacao() }

        if ("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(preload)
            return () => window.cancelIdleCallback(id)
        }

        const id = setTimeout(preload, 200)
        return () => clearTimeout(id)
    }, [])

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
