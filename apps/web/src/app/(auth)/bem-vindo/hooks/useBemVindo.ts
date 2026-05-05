import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"

export function useBemVindo() {
    const router = useRouter()
    const { user } = useUser()

    const handleContinue = () => {
        router.push("/dashboard")
    }

    return {
        user,
        handleContinue
    }
}
