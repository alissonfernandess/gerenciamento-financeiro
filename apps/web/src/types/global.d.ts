export { }

declare global {
    interface ITransaction {
        key: number;
        date: string;
        value: number;
        operationBank: OperationBank;
        transactionType: TransactionType;
        description: string;
        bckColor: Color;
        attachments?: IAttachment[];
    }

    interface IAttachment {
        name: string;
        size: number;
        type: string;
        dataUrl: string;
    }

    interface IContato {
        name: string
    }

    type OperationBank = "withdrawal" | "deposit"
    type TransactionType = "pix" | "boleto" | "saque" | "deposito" | "ted" | "doc"

    type Color = "primary" | "secondary"
}