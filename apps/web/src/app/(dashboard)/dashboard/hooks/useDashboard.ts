import { useUser } from "@/contexts/UserContext"

export function useDashboard() {
  const { user } = useUser()

  return { user }
}