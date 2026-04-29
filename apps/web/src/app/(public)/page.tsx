'use client'

import { useState } from 'react'
import { TransactionTypeSelect } from '@repo/ui'

export default function Home() {
  const [tipo, setTipo] = useState('')

  return (
    <TransactionTypeSelect
      value={tipo}
      onChange={setTipo}
      required
    />
  )
}