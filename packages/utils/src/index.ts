import type { Contato, Transaction } from "@repo/types";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "";

  if (date instanceof Date) {
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
  }

  if (typeof date === "string") {
    const isoMatch = /^\d{4}-\d{2}-\d{2}$/;
    if (isoMatch.test(date)) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }

    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return "";
    return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(parsed);
  }

  return "";
}

export function getSaldo(): number {
  return Math.floor(Math.random() * 100000000);
}

export function getTransactions(): Transaction[] {
  return [
    {
      key: 1,
      date: "2026-02-03",
      value: 300,
      operationBank: "withdrawal",
      transactionType: "saque",
      description: "Transferência Doc para Nubank",
      bckColor: "secondary",
      category: "Transferência",
    },
    {
      key: 2,
      date: "2026-02-02",
      value: 250,
      operationBank: "deposit",
      transactionType: "pix",
      description: "Transferência Pix de João",
      bckColor: "primary",
      category: "Pix",
    },
    {
      key: 3,
      date: "2026-01-10",
      value: 300,
      operationBank: "withdrawal",
      transactionType: "boleto",
      description: "Pagamento via boleto",
      bckColor: "secondary",
      category: "Boleto",
    },
    {
      key: 4,
      date: "2026-02-02",
      value: 250,
      operationBank: "deposit",
      transactionType: "pix",
      description: "Transferência Pix de João",
      bckColor: "primary",
      category: "Pix",
    },
    {
      key: 5,
      date: "2026-01-10",
      value: 300,
      operationBank: "withdrawal",
      transactionType: "boleto",
      description: "Pagamento via boleto",
      bckColor: "secondary",
      category: "Boleto",
    },
    {
      key: 6,
      date: "2025-02-10",
      value: 250,
      operationBank: "deposit",
      transactionType: "pix",
      description: "Transferência Pix de João",
      bckColor: "primary",
      category: "Pix",
    },
  ];
}

export function getContacts(): Contato[] {
  return [{ name: "Lucas Moura" }, { name: "Ana Larissa" }, { name: "Mirela" }];
}

export const transactionTypes = ["Pix", "TED", "DOC", "Boleto"] as const;

export const SHELL_URL =
  process.env.NEXT_PUBLIC_SHELL_URL ?? "http://localhost:3000";

export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3001";

export const TRANSACTIONS_URL =
  process.env.NEXT_PUBLIC_TRANSACTIONS_URL ?? "http://localhost:3002";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
