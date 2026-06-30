export type OperationBank = "withdrawal" | "deposit";

export type TransactionType =
  | "pix"
  | "boleto"
  | "saque"
  | "deposito"
  | "ted"
  | "doc";

export type Color = "primary" | "secondary";

export interface Transaction {
  id?: string;
  key: number;
  date: string;
  value: number;
  operationBank: OperationBank;
  transactionType: TransactionType;
  description: string;
  bckColor: Color;
  category?: string;
}

export interface Contato {
  name: string;
}

export interface User {
  nome: string;
  telefone: number;
  saldo: number;
  transacoes: Transaction[];
  contatos: Contato[];
}

export interface TransactionFilterParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: TransactionType;
  minValue?: number;
  maxValue?: number;
}
