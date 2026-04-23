'use client'

import { WelcomeCard } from "@repo/ui"
import { useRouter } from "next/navigation"

export default function Home() {

    const router = useRouter()

    return (
        <WelcomeCard
            name="Alisson"
            onContinue={() => router.push("/dashboard")}
        />
    )
}