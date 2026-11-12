import type { NewUser, User, UserWithCredentials } from "../entities/User"

/**
 * CAMADA: Domínio (core/repositories) — PORT
 *
 * MUDANÇA (autenticação): contrato de acesso a usuários. As rotas de API
 * dependem DESTA interface, não de arquivo/banco. Hoje a implementação grava em
 * JSON (FileUserRepository); trocar por Postgres/Prisma é criar outra classe
 * e mudar uma linha em `server-container.ts`.
 *
 * Os métodos são assíncronos porque persistência real (disco, banco, rede) é
 * sempre assíncrona — diferente dos repositórios mock de transações.
 */
export interface UserRepository {
    /** Busca por telefone (só dígitos) incluindo o hash da senha, para o login. */
    findByPhone(phone: string): Promise<UserWithCredentials | null>
    findById(id: string): Promise<User | null>
    /** @throws PhoneAlreadyRegisteredError se o telefone já estiver cadastrado. */
    create(data: NewUser): Promise<User>
}

/** Erro de domínio: tentativa de cadastrar um telefone que já existe. */
export class PhoneAlreadyRegisteredError extends Error {
    constructor() {
        super("Telefone já cadastrado")
        this.name = "PhoneAlreadyRegisteredError"
    }
}
