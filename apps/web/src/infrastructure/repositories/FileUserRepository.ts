import { randomUUID } from "node:crypto"
import { promises as fs } from "node:fs"
import path from "node:path"
import type { NewUser, User, UserWithCredentials } from "@/core/entities/User"
import { PhoneAlreadyRegisteredError, type UserRepository } from "@/core/repositories/UserRepository"
import { blindIndex, decrypt, encrypt } from "../security/crypto"

/**
 * CAMADA: Infraestrutura — ADAPTER do UserRepository (somente servidor)
 *
 * MUDANÇA (autenticação + criptografia): persiste usuários em
 * `.data/users.json`. O que é gravado em disco:
 *   - phoneEncrypted: telefone CIFRADO (AES-256-GCM) → dado pessoal protegido;
 *   - phoneIndex:     HMAC do telefone, só para localizar o usuário no login;
 *   - passwordHash:   hash scrypt da senha (a senha em si nunca é guardada).
 * Nenhum telefone nem senha aparecem em texto puro no arquivo.
 *
 * LIMITAÇÃO CONHECIDA: arquivo JSON é suficiente para esta entrega e para rodar
 * localmente, mas não serve para produção em hospedagem de disco efêmero/somente
 * leitura (ex.: Vercel). O contrato `UserRepository` permite trocar por um banco
 * real sem alterar rotas nem domínio.
 */

interface StoredUser {
    id: string
    name: string
    phoneEncrypted: string
    phoneIndex: string
    passwordHash: string
    balance: number
    createdAt: string
}

const DATA_DIR = path.join(process.cwd(), ".data")
const DATA_FILE = path.join(DATA_DIR, "users.json")

export class FileUserRepository implements UserRepository {
    /**
     * Fila de escritas: encadeia as operações para que dois cadastros simultâneos
     * não leiam o mesmo arquivo e um sobrescreva o outro (condição de corrida).
     */
    private queue: Promise<unknown> = Promise.resolve()

    private async readAll(): Promise<StoredUser[]> {
        try {
            return JSON.parse(await fs.readFile(DATA_FILE, "utf8")) as StoredUser[]
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === "ENOENT") return []
            throw error
        }
    }

    private async writeAll(users: StoredUser[]): Promise<void> {
        await fs.mkdir(DATA_DIR, { recursive: true })
        // Escreve em arquivo temporário e renomeia: a troca é atômica e evita
        // deixar o JSON pela metade se o processo cair no meio da gravação.
        const tmp = `${DATA_FILE}.${process.pid}.tmp`
        await fs.writeFile(tmp, JSON.stringify(users, null, 2), { encoding: "utf8", mode: 0o600 })
        await fs.rename(tmp, DATA_FILE)
    }

    private toUser(stored: StoredUser): User {
        return {
            id: stored.id,
            name: stored.name,
            phone: decrypt(stored.phoneEncrypted),
            balance: stored.balance,
        }
    }

    async findByPhone(phone: string): Promise<UserWithCredentials | null> {
        const index = blindIndex(phone)
        const stored = (await this.readAll()).find((u) => u.phoneIndex === index)
        return stored ? { ...this.toUser(stored), passwordHash: stored.passwordHash } : null
    }

    async findById(id: string): Promise<User | null> {
        const stored = (await this.readAll()).find((u) => u.id === id)
        return stored ? this.toUser(stored) : null
    }

    create(data: NewUser): Promise<User> {
        const run = async (): Promise<User> => {
            const users = await this.readAll()
            const index = blindIndex(data.phone)

            if (users.some((u) => u.phoneIndex === index)) {
                throw new PhoneAlreadyRegisteredError()
            }

            const stored: StoredUser = {
                id: randomUUID(),
                name: data.name,
                phoneEncrypted: encrypt(data.phone),
                phoneIndex: index,
                passwordHash: data.passwordHash,
                balance: data.balance,
                createdAt: new Date().toISOString(),
            }

            await this.writeAll([...users, stored])
            return this.toUser(stored)
        }

        // Entra na fila; um erro de uma operação não pode travar as próximas.
        const result = this.queue.then(run, run)
        this.queue = result.catch(() => undefined)
        return result
    }
}
