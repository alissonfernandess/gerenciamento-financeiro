"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { keys } from "@repo/ui"
import "./page.scss"


export default function BemVindoPage() {

    const router = useRouter()

    const [user, setUser] = useState<{ nome: string, telefone: string } | null>(null)

    const getUserLocalStorage = () => {
        const user = localStorage.getItem(keys.user_localstorage)
        return user ? JSON.parse(user) : null
    }

    useEffect(() => {
        const user = getUserLocalStorage()
        console.log(user)

        if (!user) {
            router.push("/")
        }
        const { nome, telefone } = user

        setUser({ nome, telefone })
    }, [])


    return <>
        <h1>Bem-vindo, {user?.nome}!</h1>

        <button type="button" className="btn-next">
            <span>›</span>
        </button>

        <span className="text-continuar" onClick={() => router.push("/dashboard")}>Continuar</span>
    </>
}