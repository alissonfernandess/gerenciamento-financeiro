import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"

export function useBemVindo() {
    const router = useRouter()
    const { user } = useUser()

    // MUDANÇA (pré-carregamento): enquanto o usuário lê a mensagem de boas-vindas,
    // já baixamos em segundo plano o código da próxima tela (/dashboard). Quando ele
    // clicar em "Continuar", a página abre sem esperar a rede.
    useEffect(() => {
        router.prefetch("/dashboard")
    }, [router])

    const handleContinue = () => {
        router.push("/dashboard")
    }

    return {
        user,
        handleContinue
    }
}
