import type { Contact } from "../entities/Contact"

/** PORT: contrato de acesso a contatos. Implementação fica em `infrastructure/`. */
export interface ContactRepository {
    getAll(): Contact[]
}
