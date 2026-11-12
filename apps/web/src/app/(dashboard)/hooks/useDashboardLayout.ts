import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@/contexts/UserContext"

export function useDashboardLayout() {
    const { user, isLoading, logout } = useUser()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // MUDANÇA (autenticação): antes este hook decidia "logado ou não" olhando o
        // localStorage. Agora o proxy.ts já barra no servidor quem não tem sessão;
        // aqui só tratamos o caso raro de a sessão cair com a página aberta
        // (ex.: cookie expirou). `isLoading` evita redirecionar antes de a sessão ser consultada.
        if (!isLoading && !user) {
            router.replace("/login")
        }
    }, [user, isLoading, router])

    return {
        user,
        pathname,
        logout,
        isAuthenticated: !!user
    }
}
