"use client"

import { useState, useEffect, useCallback } from "react"

export type FinancialGoal = {
  id: string
  title: string
  current: number
  target: number
}

const STORAGE_KEY = "fintech:dashboard:goals"

const DEFAULT_GOALS: FinancialGoal[] = [
  { id: "1", title: "Viagem", current: 7000, target: 10000 },
  { id: "2", title: "Reserva de Emergência", current: 4000, target: 10000 },
  { id: "3", title: "Comprar um Carro", current: 5000, target: 50000 },
]

function loadGoals(): FinancialGoal[] {
  if (typeof window === "undefined") return DEFAULT_GOALS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as FinancialGoal[]) : DEFAULT_GOALS
  } catch {
    return DEFAULT_GOALS
  }
}

function saveGoals(goals: FinancialGoal[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
  } catch {
    // localStorage indisponível — ignora silenciosamente
  }
}

export function useGoals() {
  const [goals, setGoals] = useState<FinancialGoal[]>(DEFAULT_GOALS)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setGoals(loadGoals())
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) saveGoals(goals)
  }, [goals, isLoaded])

  const addGoal = useCallback((data: Omit<FinancialGoal, "id">) => {
    setGoals((prev) => [...prev, { ...data, id: crypto.randomUUID() }])
  }, [])

  const updateGoal = useCallback((id: string, data: Partial<Omit<FinancialGoal, "id">>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)))
  }, [])

  const removeGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }, [])

  return { goals, addGoal, updateGoal, removeGoal }
}