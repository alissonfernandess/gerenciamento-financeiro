import { useState, useMemo } from "react"
import { useUser } from "@/contexts/UserContext"

const PAGE_SIZE = 5

export type TransactionType = "pix" | "boleto" | "saque" | "deposito" | "ted" | "doc"

export function useExtrato() {
  const { user } = useUser()
  const all = user?.transacoes || []

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<TransactionType | "todos">("todos")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return all.filter((t) => {
      const matchSearch =
        search === "" ||
        t.description?.toLowerCase().includes(search.toLowerCase()) ||
        t.transactionType.toLowerCase().includes(search.toLowerCase())

      const matchType = typeFilter === "todos" || t.transactionType === typeFilter

      return matchSearch && matchType
    })
  }, [all, search, typeFilter])

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page])

  const hasMore = paginated.length < filtered.length

  function loadMore() {
    setPage((p) => p + 1)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleTypeFilter(value: TransactionType | "todos") {
    setTypeFilter(value)
    setPage(1)
  }

  return {
    transactions: paginated,
    total: filtered.length,
    hasMore,
    search,
    typeFilter,
    loadMore,
    handleSearch,
    handleTypeFilter,
  }
}