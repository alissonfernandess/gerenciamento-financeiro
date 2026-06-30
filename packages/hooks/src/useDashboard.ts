"use client";

import { useAuth } from "./UserProvider";

export function useDashboard() {
  const { user } = useAuth();
  const recentTransactions = user?.transacoes.slice(0, 3) ?? [];

  return {
    user,
    recentTransactions,
  };
}
