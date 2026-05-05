"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { keys } from "@repo/ui"
import { useRouter } from "next/navigation"
import { getSaldo, getTransactions, getContacts } from '@/data'

type User = {
    nome: string
    telefone: number
    saldo: number
    transacoes: ITransaction[]
    contatos: IContato[]
}

type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)



    useEffect(() => {
        if(!user) {
            mountUser()
        }

        return () => {
            setUser(null)
            localStorage.clear()
        }
    }, [])

    const getUserLocalStorage = () => {
        const user = localStorage.getItem(keys.user_localstorage)
        return user ? JSON.parse(user) : null
    }


    function mountUser(): void {
        const storedUser = getUserLocalStorage()
        if (!storedUser) {
            router.push("/")
            return
        }

        const saldo = storedUser.saldo ?? getSaldo()
        const transacoes = getTransactions()
        const contatos = getContacts()

        const fullUser = {
            ...storedUser,
            saldo,
            transacoes,
            contatos
        }

        if (!storedUser.saldo) {
            localStorage.setItem(keys.user_localstorage, JSON.stringify({
                ...storedUser,
                saldo
            }))
        }

        setUser(fullUser)
    }


    return (
        <UserContext.Provider value={{ user, setUser }}>
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