'use client'

import { WelcomeCard, CustomInput } from "@repo/ui"
import { useRouter } from "next/navigation"
import {Cadastro} from "@repo/ui"
import Contact from "../../../../../packages/ui/src/components/Contact"

export default function Home() {
  const router = useRouter()

  return (
    <>
      {/* <Cadastro /> */}
      <Contact name="John Doe"/>
    </>
  )
}