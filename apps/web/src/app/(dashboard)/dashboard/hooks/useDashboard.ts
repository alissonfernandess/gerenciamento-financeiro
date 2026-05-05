import { useUser } from "@/contexts/UserContext"

export function useDashboard() {
    const { user } = useUser()

    const recentTransactions = user?.transacoes.slice(0, 3) || []

    return {
        user,
        recentTransactions
    }
}
