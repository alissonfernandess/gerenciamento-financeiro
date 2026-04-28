'use client'

import { WelcomeCard } from "@repo/ui"
import { useRouter } from "next/navigation"
import TransactionLine from "../../../../../packages/ui/src/components/TransactionLine"
import FrameImg from "../../../../../packages/ui/src/components/FrameImg"
import ProfileOverview from "../../../../../packages/ui/src/components/ProfileOverview"
import {Cadastro} from "@repo/ui"

export default function Home() {
  const router = useRouter()

  return (
    <Cadastro />
  )
}