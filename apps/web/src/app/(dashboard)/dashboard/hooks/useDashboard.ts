import { useUser } from "@/contexts/UserContext"
// MUDANÇA: a regra "quantas movimentações recentes mostrar" saiu do hook e foi para o
// StatementService (domínio). O hook só liga a regra ao estado do usuário.
import { getRecentTransactions } from "@/core/services/StatementService"

export function useDashboard() {
    const { user } = useUser()

    const recentTransactions = getRecentTransactions(user?.transacoes ?? [])

    return {
        user,
        recentTransactions
    }
}
