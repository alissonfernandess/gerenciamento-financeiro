import { createCipheriv, createDecipheriv, createHmac, hkdfSync, randomBytes } from "node:crypto"

/**
 * CAMADA: Infraestrutura (segurança) — criptografia de dados sensíveis
 *
 * MUDANÇA (criptografia): dados pessoais (telefone) são gravados CIFRADOS em
 * disco com AES-256-GCM. Quem ler o arquivo de dados sem a chave vê só texto
 * ilegível. O GCM também autentica: se alguém alterar o conteúdo cifrado, a
 * decifragem falha em vez de devolver lixo (integridade).
 *
 * A chave vem da variável de ambiente DATA_ENCRYPTION_KEY (32 bytes em
 * base64), NUNCA do código-fonte. A partir dela derivamos (HKDF) chaves
 * diferentes para cada finalidade, para que a chave de cifrar e a de indexar
 * nunca sejam a mesma.
 */

let encryptionKey: Buffer | null = null
let indexKey: Buffer | null = null

function masterKey(): Buffer {
    const raw = process.env.DATA_ENCRYPTION_KEY
    if (!raw) {
        throw new Error("DATA_ENCRYPTION_KEY não definida. Copie apps/web/.env.example para .env.local e preencha.")
    }
    const key = Buffer.from(raw, "base64")
    if (key.length !== 32) {
        throw new Error("DATA_ENCRYPTION_KEY deve ter 32 bytes em base64 (use: openssl rand -base64 32).")
    }
    return key
}

function deriveKey(purpose: string): Buffer {
    return Buffer.from(hkdfSync("sha256", masterKey(), Buffer.alloc(0), purpose, 32))
}

/** Cifra um texto. Formato: `v1.iv.tag.cifrado` (base64url). O IV é aleatório a cada chamada. */
export function encrypt(plainText: string): string {
    encryptionKey ??= deriveKey("data-encryption")
    const iv = randomBytes(12)
    const cipher = createCipheriv("aes-256-gcm", encryptionKey, iv)
    const data = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()])
    const tag = cipher.getAuthTag()
    return ["v1", iv.toString("base64url"), tag.toString("base64url"), data.toString("base64url")].join(".")
}

/** Decifra um valor gerado por `encrypt`. Lança erro se foi adulterado ou a chave for outra. */
export function decrypt(payload: string): string {
    encryptionKey ??= deriveKey("data-encryption")
    const [version, iv, tag, data] = payload.split(".")
    if (version !== "v1" || !iv || !tag || !data) {
        throw new Error("Formato de dado cifrado inválido")
    }
    const decipher = createDecipheriv("aes-256-gcm", encryptionKey, Buffer.from(iv, "base64url"))
    decipher.setAuthTag(Buffer.from(tag, "base64url"))
    return Buffer.concat([decipher.update(Buffer.from(data, "base64url")), decipher.final()]).toString("utf8")
}

/**
 * "Blind index": um HMAC determinístico do valor. Como o telefone é cifrado com
 * IV aleatório, o mesmo número gera cifrados diferentes e não dá para BUSCAR por
 * ele. O blind index resolve isso: guardamos esse HMAC ao lado do cifrado e
 * buscamos por ele, sem nunca guardar o telefone em texto puro.
 */
export function blindIndex(value: string): string {
    indexKey ??= deriveKey("blind-index")
    return createHmac("sha256", indexKey).update(value).digest("hex")
}
