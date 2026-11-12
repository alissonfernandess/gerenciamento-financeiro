import { useUser } from "@/contexts/UserContext"

export function useExtrato() {
    const { user } = useUser()

    const transactions = user?.transacoes || []

    return {
        transactions
    }
}
