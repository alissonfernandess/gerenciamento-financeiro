"use client";

import { useAuth } from "./UserProvider";

export function useTransactions() {
  const { user } = useAuth();
  const transactions = user?.transacoes ?? [];

  return {
    transactions,
    user,
  };
}
