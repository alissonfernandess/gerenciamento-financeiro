import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { keys } from "@repo/ui"

export function useDashboardLayout() {
    const { user } = useUser()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const storedUser = localStorage.getItem(keys.user_localstorage)
        if (!user && !storedUser) {
            router.push("/")
        }
    }, [user, router])

    return {
        user,
        pathname,
        isAuthenticated: !!user
    }
}
