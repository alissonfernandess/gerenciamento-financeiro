import { MockAccountRepository } from "./repositories/MockAccountRepository"
import { MockContactRepository } from "./repositories/MockContactRepository"
import { MockTransactionRepository } from "./repositories/MockTransactionRepository"

/**
 * CAMADA: Infraestrutura — Composition Root (injeção de dependência manual)
 *
 * MUDANÇA: único lugar do projeto que sabe QUAL implementação concreta de cada
 * repositório está em uso. O resto do app importa daqui os objetos já
 * montados e os trata pelas interfaces do domínio.
 *
 * Para usar uma API real: troque `new MockTransactionRepository()` por
 * `new ApiTransactionRepository()` e mais nada precisa mudar.
 */
export const accountRepository = new MockAccountRepository()
export const contactRepository = new MockContactRepository()
export const transactionRepository = new MockTransactionRepository()
