"use client"

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
// Tipos das entidades vêm do domínio e os dados mockados vêm dos repositórios (ver container.ts).
import type { Transaction } from '@/core/entities/Transaction'
import type { Contact } from '@/core/entities/Contact'
import { transactionRepository, contactRepository } from '@/infrastructure/container'

type User = {
    nome: string
    // MUDANÇA (segurança): o telefone chega MASCARADO do servidor, ex.: "(11) *****-9999",
    // por isso o tipo agora é string (antes era number, com o número completo).
    telefone: string
    saldo: number
    transacoes: Transaction[]
    contatos: Contact[]
}

type UserContextType = {
    user: User | null
    /** true enquanto a primeira consulta à sessão não terminou. Evita redirecionar antes da hora. */
    isLoading: boolean
    setUser: (user: User | null) => void
    /** Consulta a sessão no servidor e atualiza o usuário. Chamado após login/cadastro. */
    refreshUser: () => Promise<boolean>
    logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    /**
     * MUDANÇA (autenticação): antes o usuário era lido do localStorage, que o
     * próprio navegador pode editar e que um ataque XSS consegue ler. Agora a
     * fonte da verdade é a sessão no SERVIDOR: perguntamos a /api/auth/me, que
     * valida o cookie httpOnly (o JavaScript daqui nem consegue ver esse cookie).
     *
     * Só dados "de tela" (transações e contatos mockados) são montados aqui.
     * Nome, telefone mascarado e saldo vêm do servidor.
     */
    const refreshUser = useCallback(async (): Promise<boolean> => {
        try {
            const response = await fetch("/api/auth/me", { credentials: "same-origin" })
            if (!response.ok) {
                setUser(null)
                return false
            }

            const { user: session } = await response.json()
            setUser({
                nome: session.nome,
                telefone: session.telefone,
                saldo: session.saldo,
                transacoes: transactionRepository.getAll(),
                contatos: contactRepository.getAll(),
            })
            return true
        } catch {
            setUser(null)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        // Sem redirecionar aqui de propósito: quem protege as rotas é o proxy.ts
        // (no servidor). Se redirecionássemos, a própria tela de cadastro/login
        // (onde é normal não haver sessão) seria expulsa para outra página.
        void refreshUser()
        // MUDANÇA: o cleanup antigo chamava `localStorage.clear()` e `setUser(null)`
        // ao desmontar. No StrictMode (dev) isso roda logo após montar e podia apagar
        // o cadastro. Com a sessão no servidor, não há nada a limpar no navegador.
    }, [refreshUser])

    /** Encerra a sessão: o servidor expira o cookie e o estado local é descartado. */
    const logout = useCallback(async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" })
        } finally {
            setUser(null)
            router.replace("/login")
        }
    }, [router])

    return (
        <UserContext.Provider value={{ user, isLoading, setUser, refreshUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser must be used within UserProvider")
    }

    return context
}
