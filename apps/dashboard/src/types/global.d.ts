import type { Contato, Transaction } from "@repo/types";

declare global {
  type ITransaction = Transaction;
  type IContato = Contato;
}

export {};
