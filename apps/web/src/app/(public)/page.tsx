'use client'

import { WelcomeCard, CustomInput } from "@repo/ui"
import { useRouter } from "next/navigation"
import {Cadastro} from "@repo/ui"

export default function Home() {
  const router = useRouter()

  return (
    <>
      {/* <Cadastro /> */}
      <CustomInput required={true} placeholder="Digite algo..." onChange={(e : React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)} />
    </>
  )
}