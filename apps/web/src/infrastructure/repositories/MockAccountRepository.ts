import type { AccountRepository } from "@/core/repositories/AccountRepository"

/**
 * ADAPTER: implementa `AccountRepository` com saldo aleatório.
 * MUDANÇA: veio de `data/index.ts → getSaldo()`. O comportamento é o mesmo
 * de antes (saldo sorteado); só passou a ficar atrás de uma interface.
 */
export class MockAccountRepository implements AccountRepository {
    getBalance(): number {
        return Math.floor(Math.random() * 100000000)
    }
}
