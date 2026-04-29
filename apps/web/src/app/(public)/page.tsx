'use client'

<<<<<<< HEAD
import { useState } from 'react'
import { TransactionTypeSelect } from '@repo/ui'
=======
import { WelcomeCard, CustomInput } from "@repo/ui"
import { useRouter } from "next/navigation"
import {Cadastro} from "@repo/ui"
import Contact from "../../../../../packages/ui/src/components/Contact"
>>>>>>> 782389d5077711a4d20e610d30b958688dfcd008

export default function Home() {
  const [tipo, setTipo] = useState('')

  return (
<<<<<<< HEAD
    <TransactionTypeSelect
      value={tipo}
      onChange={setTipo}
      required
    />
=======
    <>
      {/* <Cadastro /> */}
      <Contact name="John Doe"/>
    </>
>>>>>>> 782389d5077711a4d20e610d30b958688dfcd008
  )
}