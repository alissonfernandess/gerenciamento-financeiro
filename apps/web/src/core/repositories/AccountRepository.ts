/** PORT: contrato de acesso à conta. Implementação fica em `infrastructure/`. */
export interface AccountRepository {
    getBalance(): number
}
