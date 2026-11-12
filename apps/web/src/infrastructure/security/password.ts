import { randomBytes, scrypt, timingSafeEqual } from "node:crypto"

/**
 * CAMADA: Infraestrutura (segurança) — hash de senha
 *
 * MUDANÇA (autenticação): a senha NUNCA é guardada. Guardamos apenas um hash
 * gerado com scrypt, que é uma função de derivação de chave propositalmente
 * LENTA e que consome memória, o que torna ataques de força bruta caros.
 * É nativo do Node (node:crypto), sem dependência externa nem compilação nativa.
 *
 * - Salt aleatório por senha: duas senhas iguais geram hashes diferentes e
 *   tabelas pré-calculadas (rainbow tables) deixam de funcionar.
 * - Os parâmetros (N, r, p) ficam gravados no próprio hash, então dá para
 *   aumentar o custo no futuro sem invalidar as senhas já guardadas.
 * - A comparação usa timingSafeEqual para não vazar informação pelo tempo
 *   de resposta.
 */

// N=2^17, r=8, p=1: mínimo recomendado pela OWASP para scrypt quando o Argon2id não
// está disponível. A memória usada por hash é 128 * N * r bytes = 128 MiB.
// (Os padrões do Node são N=2^14 e 32 MiB de limite: fracos demais para senhas.)
// ATENÇÃO: cada verificação de senha consome ~128 MiB e algumas centenas de ms.
// Por isso o login tem limite de tentativas (rateLimiter.ts).
const SCRYPT_N = 131072
const SCRYPT_R = 8
const SCRYPT_P = 1
const KEY_LENGTH = 64
const SALT_LENGTH = 16
// O Node limita a memória do scrypt a 32 MiB por padrão; aqui precisamos de 128 MiB,
// então o limite sobe para 256 MiB (precisa ficar acima de 128 * N * r).
const MAX_MEMORY = 256 * 1024 * 1024

function derive(password: string, salt: Buffer, n: number, r: number, p: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, KEY_LENGTH, { N: n, r, p, maxmem: MAX_MEMORY }, (error, key) => {
            if (error) reject(error)
            else resolve(key)
        })
    })
}

/** Gera o hash no formato `scrypt$N$r$p$salt$hash` (salt e hash em base64). */
export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH)
    const key = await derive(password, salt, SCRYPT_N, SCRYPT_R, SCRYPT_P)
    return ["scrypt", SCRYPT_N, SCRYPT_R, SCRYPT_P, salt.toString("base64"), key.toString("base64")].join("$")
}

/** Confere uma senha contra um hash guardado. Nunca lança por hash malformado: retorna false. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    const [scheme, n, r, p, saltB64, hashB64] = stored.split("$")
    if (scheme !== "scrypt" || !n || !r || !p || !saltB64 || !hashB64) return false

    const expected = Buffer.from(hashB64, "base64")
    const actual = await derive(password, Buffer.from(saltB64, "base64"), Number(n), Number(r), Number(p))

    return actual.length === expected.length && timingSafeEqual(actual, expected)
}

/**
 * Hash falso usado quando o telefone do login NÃO existe: executamos a mesma
 * verificação (cara) para que "usuário inexistente" e "senha errada" demorem o
 * mesmo tempo. Sem isso, o tempo de resposta revelaria quais telefones existem.
 */
let dummyHash: Promise<string> | null = null
export function getDummyHash(): Promise<string> {
    dummyHash ??= hashPassword("senha-falsa-para-igualar-o-tempo-de-resposta")
    return dummyHash
}
